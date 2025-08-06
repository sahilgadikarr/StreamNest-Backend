import { ApiError } from '../utils/ApiError.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';


const generateAccessAndRefreshTokens= async (userId)=>{
    try {
        const user=await User.findById(userId)

        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
       await user.save({validateBeforeSave:false})
       return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and refresh tokens...")
        
    }
}
const registerUser=asyncHandler(async (req,res)=>{
  // get user details from frontend
  // validation- not empty
  // check if user already exists
  // check for images.check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return result

  const {fullName ,email,username,password}=req.body
  console.log("email: ",email);
  

//if(fullName===""){
 //   throw new ApiError(400,"Name cant be empty")
//}

if(
    [fullName ,email,username,password].some((field)=>field?.trim()==="")
)
    {
        throw new ApiError(400,"all fields are required")
    }

const existedUser= await User.findOne({
    $or:[{username },{ email}]
})
if(existedUser){
    throw new ApiError(409,"user already exists")
}


 const avatarLocalPath=req.files?.avatar[0]?.path
 const coverImageLocalPath=req.files?.coverImage[0]?.path; //HANDLE the part of skipping checking on this coverImage

 if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
 }

 const avatar=await uploadOnCloudinary(avatarLocalPath)
 const coverImage=await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
    throw new ApiError(400,"AVATAR MISSING")
 }


 const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username
    
 })

 const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if(!createdUser){
    throw new Error(500,"something went wrong while registering the user")
 }
 return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Succesfully")
 )

})

const loginUser= asyncHandler(async (req,res)=>{
    /*
    login
    1. req.body se data le lo
    2. username and email hai ki nahi
    3.find user
    4. password check karo
    5. access and refresh token generate
    6. send secure cookies
    */

    const {email,username,password}=req.body

    if(!username || !email){
        throw new ApiError(400,"username or email is required")
    }
    
   const user= await User.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new ApiError(404,"User doesnt exist...F ")

    }

   const isPasswordValid= await user.isPasswordCorrect(password)

   if(!isPasswordValid){
    throw new ApiError(401,"Invalid user credentials...F ")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

   const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

   const options ={
    httpOnly: true,
    secure:true
   }
   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",refreshToken,options)
   .json(
    new ApiResponse(200,
    {
        user:loggedInUser,accessToken,refreshToken
    },
    "User logged in Successfully"
    )
   )

})

const logOutUser= asyncHandler( async (req,res)=>{
    //middleware use karnege for logout
  await  User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,
        {
        
        },"User Logged Out"
    ))

})


export {registerUser
    ,loginUser
    ,logOutUser
}