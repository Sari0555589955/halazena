import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  accordionStyle,
  checkoutButtonStyle,
} from "../check_assets/checkoutStyle";
import { Box, Button, FormLabel, Grid, InputBase, Stack } from "@mui/material";
import InputText from "./DynamicInputText";
import StaticInputText from "./StaticInputText";
import { useTranslation } from "react-i18next";
export default function CheckoutAccordions({ formik, cart, paymentIsCash }) {
  const [expanded, setExpanded] = React.useState("payment_cash");
  const [_, { language }] = useTranslation();
  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { values, errors, touched, handleChange, handleBlur, paymentMethod } =
    formik;
  const handleChangePayment = (boolean) => {
    formik.setValues({
      ...values,
      payInCash: boolean,
    });
  };
  
  return (
    <div>
      <Accordion
        expanded={expanded === "payment_cash"}
        onChange={handleAccordion("payment_cash")}
        sx={accordionStyle}
      >
        <AccordionSummary
          expandIcon={
            expanded === "payment_cash" ? <RemoveIcon /> : <AddIcon />
          }
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}>
            Payment Method
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <input
                type="radio"
                id="cash"
                name="payInCash"
                checked={paymentIsCash}
              />
              <FormLabel sx={{ cursor: "default" }} htmlFor="cash">
                Payment in cash upon receipt
              </FormLabel>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <input
                type="radio"
                id="visa"
                name="payInCash"
                checked={!paymentIsCash}
              />
              <FormLabel sx={{ cursor: "default" }} htmlFor="visa">
                Visa/Mastercard
              </FormLabel>
            </Stack>
          </Box>
          {!paymentIsCash ? (
            <Grid
              container
              sx={{
                height: !paymentIsCash ? "200px" : 0,
                transition: "0.5s height",
                overflow: "hidden",
              }}
            >
              <Grid md={6} xs={12} mt={3}>
                <StaticInputText
                  index={0}
                  type="text"
                  name="formalName"
                  value={values.formalName}
                  error={errors.formalName}
                  label={
                    language === "en"
                      ? "the name of the card"
                      : "الأسم بالبطاقة"
                  }
                  touched={touched.formalName}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Grid>
              <Grid md={6} xs={12} mt={3}>
                <StaticInputText
                  index={1}
                  type="text"
                  name="creditCard"
                  value={values.creditCard}
                  error={errors.creditCard}
                  label={language === "en" ? "Card Number" : "رقم البطاقة"}
                  touched={touched.creditCard}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Grid>
              <Grid md={6} xs={12} mt={3}>
                <StaticInputText
                  index={0}
                  type="date"
                  name="expirationDate"
                  value={values.expirationDate}
                  error={errors.expirationDate}
                  touched={touched.expirationDate}
                  label={language === "en" ? "Release Date" : "تاريخ الإصدار"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Grid>
              <Grid md={6} xs={12} mt={3}>
                <StaticInputText
                  index={1}
                  type="text"
                  name="protectionSymbol"
                  value={values.protectionSymbol}
                  error={errors.protectionSymbol}
                  label={language === "en" ? "Security code" : "رمز الحماية"}
                  touched={touched.protectionSymbol}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
              </Grid>
            </Grid>
          ) : undefined}
       
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
