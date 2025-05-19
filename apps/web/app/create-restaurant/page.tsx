"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../lib/firebase.config";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

const availableKeywords = ["Italian", "Vegan", "Grill", "Bakery", "Sushi"];

export default function CreateRestaurantPage() {
  const { user } = useUser();
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [openingHours, setOpeningHours] = useState<Date | null>(null);
  const [closingHours, setClosingHours] = useState<Date | null>(null);

  const { register, handleSubmit, setValue } = useForm();

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
      imageUrls,
      userId: user.uid,
      isAvailable: true,
    };

    console.log("Final restaurant data:", newRestaurant);

    // Call your Firestore function here (e.g. addDoc)
    setUploading(false);
    router.push("/profile");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Create a Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} required />

        <label>Street Address</label>
        <input {...register("streetAddress")} required />

        <label>City</label>
        <input {...register("city")} required />

        <label>Postcode</label>
        <input {...register("postcode")} required />

        <label>Country</label>
        <input {...register("country")} required />

        <label>Phone</label>
        <input {...register("phone")} required />

        <label>Email</label>
        <input {...register("email")} type="email" required />

        <label>Website</label>
        <input {...register("website")} type="url" />

        <label>Description</label>
        <textarea {...register("description")} rows={4} required />

        <label>Opening Hours</label>
        <DatePicker
          selected={openingHours}
          onChange={(date) => setOpeningHours(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
        />

        <label>Closing Hours</label>
        <DatePicker
          selected={closingHours}
          onChange={(date) => setClosingHours(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          dateFormat="h:mm aa"
        />

        <label>Keywords (up to 3)</label>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {availableKeywords.map((kw) => (
            <label key={kw}>
              <input
                type="checkbox"
                checked={keywords.includes(kw)}
                onChange={() => handleKeywordToggle(kw)}
                disabled={!keywords.includes(kw) && keywords.length >= 3}
              />
              {kw}
            </label>
          ))}
        </div>

        <label>Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Creating..." : "Create Restaurant"}
        </button>
      </form>
    </div>
  );
}
