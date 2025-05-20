"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase.config";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
// import { handleLogout } from "@/services/auth";
import { availableKeywords } from "@/data/variables";
import Styles from "../../styles/create-restaurant.module.scss";
import { createNewRestaurant } from "../../lib/databaseActions"

// const availableKeywords = ["Italian", "Vegan", "Grill", "Bakery", "Sushi"];

export default function CreateRestaurantPage() {
  const { user } = useUser();
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [openingHours, setOpeningHours] = useState<Date | null>(null);
  const [closingHours, setClosingHours] = useState<Date | null>(null);
  const [secondOpeningHours, setSecondOpeningHours] = useState<Date | null>(null);
  const [secondClosingHours, setSecondClosingHours] = useState<Date | null>(null);

  const { register, handleSubmit } = useForm();

  const handleKeywordToggle = (keyword: string) => {
    setKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : prev.length < 3
        ? [...prev, keyword]
        : prev
    );
  };

  const onSubmit = async (data: any) => {
    if (!user) return alert("You must be logged in");

    setUploading(true);

    const imageUrls = await Promise.all(
      images.map(async (img) => {
        const filename = `restaurant_${Date.now()}_${img.name}`;
        const imageRef = ref(storage, `restaurants/${filename}`);
        await uploadBytes(imageRef, img);
        return await getDownloadURL(imageRef);
      })
    );

    const newRestaurant = {
      ...data,
      keywords,
      openingHours: openingHours?.toISOString(),
      closingHours: closingHours?.toISOString(),
      secondOpeningHours: secondOpeningHours?.toISOString() || "",
      secondClosingHours: secondClosingHours?.toISOString() || "",
      imageUrls,
      userId: user.uid,
      isAvailable: true,
    };

    console.log("Final restaurant data:", newRestaurant);
    await createNewRestaurant(newRestaurant, "restaurants")

    // Call your Firestore function here (e.g. addDoc)
    setUploading(false);
    router.push("/dashboard");
  };

  return (
    <div className={Styles.fullWidthContainer}>
      <h1>Create a Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={Styles.formGrid}>
        <div className={Styles.inputContainer}>
          <label>Name</label>
          <input {...register("name")} className={Styles.input} required />
        </div>

        <div className={Styles.inputContainer}>
          <label>Street Address</label>
          <input {...register("streetAddress")} className={Styles.input} required />
        </div>

        <div className={Styles.inputContainer}>
          <label>City</label>
          <input {...register("city")} className={Styles.input} required />
        </div>
        <div className={Styles.inputContainer}>
          <label>Postcode</label>
          <input {...register("postcode")} className={Styles.input} required />
        </div>
        <div className={Styles.inputContainer}>
          <label>Country</label>
          <input {...register("country")} className={Styles.input} required />
        </div>
        <div className={Styles.inputContainer}>
          <label>Phone</label>
          <input {...register("phone")} className={Styles.input} required />
        </div>

        <div className={Styles.inputContainer}>
          <label>Email</label>
          <input {...register("email")} type="email" className={Styles.input} required />
        </div>
        <div className={Styles.inputContainer}>
          <label>Website</label>
          <input {...register("website")} className={Styles.input} type="url" />
        </div>
        <div className={`${Styles.inputContainer} ${Styles.inputTextarea}`}>
          <label>Description</label>
          <textarea {...register("description")} rows={4} className={Styles.input} required />
        </div>
        <div className={`${Styles.inputContainer} ${Styles.inputOpeningHours}`}>
          <div className="flex flex-col gap-2">
            <label>Opening Hours</label>
            <DatePicker
              selected={openingHours}
              onChange={(date) => setOpeningHours(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              required
            />

            <label>Closing Hours</label>
            <DatePicker
              selected={closingHours}
              onChange={(date) => setClosingHours(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Second Opening Hours</label>
            <DatePicker
              selected={secondOpeningHours}
              onChange={(date) => setSecondOpeningHours(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
            />

            <label>Second Closing Hours</label>
            <DatePicker
              selected={secondClosingHours}
              onChange={(date) => setSecondClosingHours(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={5}
              dateFormat="h:mm aa"
            />
          </div>
        </div>
        <div className={`${Styles.inputContainer} ${Styles.inputKeywords}`}>

        <label>Keywords (up to 3)</label>
        <div className={Styles.keywordsContainer}>
          {availableKeywords.map((kw) => (
            <label key={kw}>
              <input
                type="checkbox"
                checked={keywords.includes(kw)}
                onChange={() => handleKeywordToggle(kw)}
                disabled={!keywords.includes(kw) && keywords.length >= 3}
              />
              {`     ${kw}`}
            </label>
          ))}
        </div>
        </div>
        <div className={Styles.inputContainer}>

        <label>Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />
        </div>

        <div className={Styles.previewContainer}>
  {images.map((img, index) => (
    <img
      key={index}
      src={URL.createObjectURL(img)}
      className={Styles.previewImage}
      alt="preview"
    />
  ))}
</div>


        <button type="submit" className={Styles.button} disabled={uploading}>
          {uploading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
      {/* <button
        onClick={() => handleLogout()}
        className={Styles.button}
      >
        Logout
      </button> */}
    </div>
  );
}
