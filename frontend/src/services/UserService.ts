import api from "../api/axios";

export const getProfile = async () => {
  try {
    const response = await api.get("/user/profile");

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProfile = async (formData: FormData) => {
  try {
    const response = await api.patch("/user/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const contacts = async () => {
  try {
    const response = await api.get("/contact");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveContact = async (nexaId:number) => {
  try {
    const response = await api.post("/contact/save", {nexaId});
console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteContact = async (id:string) =>{
  try {
    const response = await api.delete(`/contact/delete/${id}`);

    return response.data;
  } catch (error) {
    console.log("error",error);
    throw error;
  }
}