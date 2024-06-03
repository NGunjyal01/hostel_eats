import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UpdatePersonalInformation = () => {

    const user = useSelector(store => store.user);
    const {firstName,lastName,phone,email,gender,dob} = user;
    const {register,handleSubmit,formState:{errors}} = useForm();
    const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";
    const genders = ["Male","Female","Others"];

    const handleOnSubmit = ()=>{
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)} className="bg-[#222831] w-[70%] h-fit p-10 pb-28 mt-10 rounded-xl flex flex-col relative">
            <h1 className="text-lg">Update Personal Information</h1>
            <div className="grid grid-cols-12">
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="Enter First Name" id="firstName"
                    className={`${inputStyle}`} {...register('firstName',{required:true})} defaultValue={firstName}/>
                    {errors.firstName && ( <span className="mt-1 text-xs text-red-500">
                        Please enter your first name.
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" placeholder="Enter Last Name" id="lastName" 
                    className={`${inputStyle}`} {...register('lastName',{required:true})} defaultValue={lastName}/>
                    {errors.lastName && ( <span className="mt-1 text-xs text-red-500">
                        Please enter your last name.
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" name="email" placeholder="Enter Email Address" id="email" 
                    className={`${inputStyle}`} {...register('email',{required:true})} defaultValue={email}/>
                    {errors.email && ( <span className="mt-1 text-xs text-red-500">
                        Please enter your email.
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" name="phone" placeholder="Enter Phone Number" id="phone" 
                    className={`${inputStyle}`} {...register('phone',{required:{value:true, message:"Please enter you Phone Number."},
                    minLength:{value:10,message:"Invalid Phone Number"},maxLength:{value:10,message:"Invalid Phone Number"}})} 
                    defaultValue={phone}/>
                    {errors.phone && ( <span className="mt-1 text-xs text-red-500">
                        {errors.phone.message}
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" name="dob" id="dob" 
                    className={`${inputStyle}`} {...register('dob',{ required: {value: true, message: "Please enter your Date of Birth."},
                    max: {value: new Date().toISOString().split("T")[0],message: "Date of Birth cannot be in the future."}})}
                    defaultValue={dob}/>
                    {errors.dob && ( <span className="mt-1 text-xs text-red-500">
                        {errors.dob.message}
                    </span>)}
                </div>
                <div className="col-span-6 flex flex-col mt-8">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" className={`${inputStyle}`} {...register('gender',{required:{value:true,message:"Please enter your Gender."}})}
                    defaultValue={gender}>
                        {genders.map(gender => <option key={gender}>{gender}</option>)}
                    </select>
                    {errors.gender && ( <span className="mt-1 text-xs text-red-500">
                        {errors.gender.message}
                    </span>)}
                </div>
            
            </div>
            <div className="absolute flex space-x-5 right-10 bottom-5">
                <button className="bg-white text-black w-32 rounded-lg py-2">Cancel</button>
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit" onClick={handleOnSubmit}>Save</button>
            </div>
        </form>
    )
}

export default UpdatePersonalInformation;