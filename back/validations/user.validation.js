import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })

    const userUpdate = joi.object({
      email: joi.string().email(),
      password: joi.string(),
    
    })

    const userLogin = joi.object({
      name: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })

    return {
        userCreate: userCreate.validate(body),
        userUpdate: userUpdate.validate(body),
        userLogin: userLogin.validate(body),
    }
}
