import {
  Box,
  Button,
  Grid,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { inputs } from "./Profile.data";
import { formData } from "./Profile.form";
import { useTranslation } from "react-i18next";
import { useGetMeQuery } from "../../APIs/UserApis";
import { useUpdateUserMutation } from "../../APIs/UserApis";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  colors,
  publicFontFamily,
  publicSizes,
} from "../../components/publicStyle/publicStyle";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../../APIs/userSlice";
const Profile = () => {
  const [_, { language }] = useTranslation();
  const [updateUser] = useUpdateUserMutation();
  const [userId, setUserId] = useState();
  const { currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser?.email) {
      setUserId(currentUser?._id);
      const vals = {
        ...currentUser,
        _id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        __v: undefined,
      };
      delete vals.password;
      formik.setValues(vals);
      formik.setFieldValue(
        "expirationDate",
        moment(currentUser.expirationDate).format("YYYY-MM-DD")
      );
    }
  }, [currentUser]);
  const formik = useFormik({
    initialValues: formData.initialVals,
    validationSchema: formData.validation,
    onSubmit: (values) => {
      updateUser({ userId, values }).then((res) => {
        toast.success(
          language === "en" ? res.data.success_en : res.data.success_ar
        );
        dispatch(setCurrentUser(res?.data.user));
      });
    },
  });
  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        py: "150px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontFamily: publicFontFamily,
          fontSize: publicSizes.body,
          fontWeight: "bold",
        }}
      >
        {language === "en" ? "Account Details" : "تفاصيل الحساب"}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} mt="20px">
        <Grid container spacing={2} rowSpacing={4} justifyContent="center">
          <Grid item xs={12}>
            {inputs.map((inpt) => (
              <Box
                sx={{
                  mt: "20px",
                }}
              >
                {/* <TextField
                type={inpt.type}
                name={inpt.name}
                value={formik.values[inpt.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ minWidth: "100%" }}
                label={language === "en" ? inpt.label_en : inpt.label_ar}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
                <Typography
                  component="label"
                  sx={{
                    fontFamily: publicFontFamily,
                    fontWeight: "bold ",
                  }}
                >
                  {inpt[`label_${language}`]}
                </Typography>
                <InputBase
                  type={inpt.type}
                  name={inpt.name}
                  value={formik.values[inpt.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={inpt[`label_${language}`]}
                  sx={{
                    mt: "5px",
                    display: "block",
                    backgroundColor: "#fff",
                    p: "10px 15px",
                    borderRadius: "40px",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                    fontFamily: publicFontFamily,
                  }}
                />
                {formik.errors[inpt.name] && formik.touched[inpt.name] && (
                  <Typography
                    color="red"
                    sx={{
                      fontFamily: publicFontFamily,
                    }}
                  >
                    {formik.errors[inpt.name]}
                  </Typography>
                )}
              </Box>
            ))}
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: `${colors.newMainColor} !important`,
                color: "#fff",
                p: "5px 12px",
                textTransform: "capitalize",
                mt: "25px",
                fontFamily: publicFontFamily,
                fontSize: publicSizes.button,
              }}
            >
              {language === "en" ? "Update" : "تحديث"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
