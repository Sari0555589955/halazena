import { Roles } from './../enum/enums.enum'
import { AuthenticatedRequest } from '../middleWares/authentication.middleWare'
import { Response } from 'express'
import { asyncHandler } from '../middleWares/asyncHandler'
import Order from '../model/order.model'
import User from '../model/user.model'
import Cart from '../model/cart.model'
import moment, { months } from 'moment'

// user creating order
// ROUTE /POST /unStore/api/v1/order
//access Public(user)
export const createOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // create order for user
    // check if there is order with the same data
    // first lets get the user that is registered right now to get the user then get the cart for that user
    // then use this data iniside the product of the owner

    const foundUser = req.user
    if (foundUser) {
      // get all the cart product with that user id
      const cartProducts: any = await Cart.find({ user: foundUser._id })
        .populate([
          { path: 'user', model: 'User' },
          { path: 'product', model: 'Product' },
        ])
        .select('-_id')

      if (!cartProducts[0]) {
        return res.status(400).send({
          error_en: 'cant Create Order Without adding to the cart first',
          error_ar: 'لا يمكن إنشاء طلب دون الإضافة إلى سلة التسوق أولاً',
        })
      }

      const totals = calculateTotalOrder(cartProducts)
      // means create new Order

      const order = new Order({
        ...req.body,
        products: cartProducts,
        subTotal: totals.subTotal,
        totalQuantity: totals.totalQuantity,
        user: foundUser._id,
      })
      order.total = order.subTotal + order.shipping
      // i should free the cart after creating the order
      await order.save()
      console.log('foundUserId; ', foundUser?._id)
      await Cart.deleteMany({ user: foundUser._id })
      res.status(200).send({
        success_en: 'Order Added Successfully',
        success_ar: 'تمت إضافة الطلب بنجاح',
        order,
      })
    }
  },
)

const calculateTotalOrder = (cartProducts: any[]) => {
  let subTotal = 0
  let totalQuantity = 0
  cartProducts.forEach((item: any) => {
    const { product } = item
    subTotal += product.price * product.sale * item.Quantity
    totalQuantity += item.Quantity
  })
  return { subTotal, totalQuantity }
}

// update order data
// ROUTE /put /unStore/api/v1/update/:orderId
export const UpdateOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        ...req.body,
        orderStatus: req.body.orderStatus == 'pending' ? 'done' : 'pending',
      },
      { new: true },
    ).populate({
      path: 'user',
      model: 'User',
    })
    if (!updatedOrder) {
      return res.status(400).send({
        error_en: 'cant update order status cause it is not found ',
        error_ar: 'لا يمكن تحديث حالة الطلب لأنه غير موجود',
      })
    }
    const pendingCount = await Order.count({ orderStatus: 'pending' })
    const doneCount = await Order.count({ orderStatus: 'done' })
    res.status(200).send({
      success_en: 'order Status updated successfully ',
      success_ar: 'تم تحديث حالة الطلب بنجاح',
      order: updatedOrder,
      pendingCount,
      doneCount,
    })
  },
)
// get all Orders
// ROUTE /GET /unStore/api/v1/order/getAll/:params?

export const getALLOrders = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    if (req.user.role === Roles.USER) {
      // create function take params based on it return the filtered data
      const getFilteredOrders = async () => {
        // create the pagination concept in global
        let count = await Order.find({}).countDocuments()
        let page: any = req.query.page
        let limit = 1
        let skipLimit = (page - 1) * limit
        let pages = Math.round(count / limit)
        if (!req.query.page) {
          limit = count
          skipLimit = 0
          pages = 0
        }
        const getCashOrCredit = async (option: any) => {
          count = await Order.find({ payInCash: option }).countDocuments()

          const data = await Order.find({ payInCash: option })
            .skip(skipLimit)
            .limit(limit)
          if (data) {
            return { data, count: !pages ? pages : count }
          }
        }
        const getLowestOrHighest = async (option: any) => {
          const data = await Order.find({})
            .sort(`${option ? 'total' : '-total'}`)
            .skip(skipLimit)
            .limit(limit)
          if (data) {
            return { data, count: pages }
          }
        }
        const getOrdes = async () => {
          const data = await Order.find({ user: req.user?._id })
            .skip(skipLimit)
            .limit(limit)
            .populate([
              { path: 'user', model: 'User' },
              { path: 'products.product', model: 'Product' },
            ])

          return { data, count: pages }
          // if(orders[0]){
          //     return orders
          // }
        }
        switch (req.params.params) {
          case 'cash':
            // call cash
            return getCashOrCredit(true)
          case 'credit':
            return getCashOrCredit(false)
          case 'lowest':
            return getLowestOrHighest(1)
          case 'highest':
            return getLowestOrHighest(0)
          default:
            return getOrdes()
        }
      }
      let filteredData: any = await getFilteredOrders()
      console.log(filteredData)

      if (!filteredData.data[0]) {
        return res.status(400).send({
          error_en: 'Orders Are Not Found',
          error_ar: 'لم يتم العثور على الطلبات',
        })
      }
      const pendingCount = await Order.count({ orderStatus: 'pending' })
      const doneCount = await Order.count({ orderStatus: 'done' })
      // filter by the aggregate to have multiple matcher

      res.status(200).send({
        success_en: 'Orders Are Fetched Successsfully',
        success_ar: 'تم جلب الطلبات بنجاح',
        count: filteredData.length,
        orders: filteredData,
        pendingCount,
        doneCount,
      })
    } else {
      const pendingCount = await Order.count({ orderStatus: 'pending' })
      const doneCount = await Order.count({ orderStatus: 'done' })
      // filter by the aggregate to have multiple matcher
      const filteredData = await Order.find()
      res.status(200).send({
        success_en: 'Orders Are Fetched Successsfully',
        success_ar: 'تم جلب الطلبات بنجاح',
        count: filteredData.length,
        orders: filteredData,
        pendingCount,
        doneCount,
      })
    }
  },
)

// getOrder ById
//ROUTE /GET /unStore/api/v1/order/getById/:orderId
export const getOrderById = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate([
      {
        path: 'products.product',
        model: 'Product',
      },
    ])
    if (!order) {
      return res
        .status(400)
        .send({ error_en: 'Order is Not Found', error_ar: 'الطلب غير موجود' })
    }
    res.status(200).send({
      success_en: 'Order is Fetched Successfully: ',
      success_ar: 'Order is Fetched Successfully',
      order: order,
    })
  },
)

export const getOrdersByUser = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const foundUser: any = req.user
    const orders = await Order.find({ user: foundUser._id }).populate({
      path: 'products.product',
      model: 'Product',
    })
    if (!orders[0]) {
      return res.status(400).send({
        error_en: 'Orders Are Not Found',
        error_ar: 'لم يتم العثور على الطلبات',
      })
    }
    // delete cart before order completed
    res.status(200).send({
      success_en: 'Orders Are Fetched Successfully ',
      success_ar: 'تم جلب الطلبات بنجاح',
      orders,
    })
  },
)
// delete order
//ROUTE /DELETE /unStore/api/v1/order/delete/:orderId
export const deleteOrder = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const order = await Order.findByIdAndDelete(req.params.orderId)
    if (!order) {
      return res.status(400).send({
        error_en: 'order cant be deleted',
        error_ar: 'لا يمكن حذف الطلب',
      })
    }
    res.status(200).send({
      success_en: 'order deleted successfully ',
      success_ar: 'تم حذف الطلب بنجاح',
    })
  },
)

// GET HOW MANY ORDERS ARE HAPPENED IN THE DAY
//ROUTE /GET /unStore/api/v1/order/howmanInDay
export const getHowManyOrdersInOneDay = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    // n need to create opject of 12 month start from january to december
    let monthlyDate: any = {}
    // input object then outpu return object of all the mothes
    let numOfOrderInADay = 0
    let totalInDay = 0
    let date = new Date()
    // get each order and compare it to it
    const orders = await Order.find({})

    // need also to get the total of each order
    monthlyDate = getMonthlyDate(monthlyDate)

    // next step create

    orders.map((order: any) => {
      let newDate = new Date(order.createdAt)
      // here i should return based on the day

      // how many order has been created
      // moment(timeNow.setMonth(index)).format('MMMM')
      // i shoul  get to object to contais
      // i need to set then get in the same place for the date with moment
      if (
        Object.keys(monthlyDate).includes(
          moment(newDate.setMonth(newDate.getMonth())).format('MMMM'),
        )
      ) {
        monthlyDate[
          `${moment(newDate.setMonth(newDate.getMonth())).format('MMMM')}`
        ]++
      }

      if (!(date.getDay() - newDate.getDay())) {
        // now i should count how many order is been created
        numOfOrderInADay++
        totalInDay += order.total
      }
    })
    res.status(200).send({
      success_en: 'Returned No of Order of the day',
      success_ar: 'تم إرجاع رقم طلب اليوم',
      numOfOrderInADay,
      totalInDay,
      monthlyDate,
    })
  },
)
const getMonthlyDate = (object: any) => {
  const arr = Array.from(Array(13).keys())
  // input object
  // output {'january'}
  const timeNow = new Date()
  arr.map((_, index) => {
    let month = moment(timeNow.setMonth(index)).format('MMMM')
    if (!object[`${month}`]) {
      object[`${month}`] = 0
    }
  })
  return object
  // const now = moment(timeNow).format('YYYY / MM / DD')
}
// need to get the dailgy orders
// the question is how many user order from the site each day
// this is analytical question means i need to calculate how many order
// requested each day then get the average but how
// i only have access to the order and the date the order takes place
// he want to know how many orders in the day
// i will compare the time now and get the day the full year and compare it then it will count how many happened that day
