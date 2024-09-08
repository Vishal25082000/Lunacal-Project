"use client"

import { db } from '@/utils/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import CardSideDock from '../CardSideDock';
import HrLine from '../HrLine';
import ImageUploadModal from '../ImageUploadModal';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchImages = async () => {
    try {
      const q = query(collection(db, "userImages"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedImages: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.imageUrl) fetchedImages.push(data.imageUrl);
      });
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    fetchImages();
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getVisibleImages = () => {
    if (images.length === 0) return [];
    return [
      images[currentIndex],
      images[(currentIndex + 1) % images.length],
      images[(currentIndex + 2) % images.length],
    ];
  };

  return (
    <>
      <section className='md:max-w-[720px] w-full  h-full relative'>
        <div className="pt-[20px] pb-[22px] sc-1390:px-[53px] xl:pr-11 lg:pr-8 pr-3 pl-[46px] bg-cardHo rounded-[18.89px] relative shadow-custom-card min-h-[330px] overflow-hidden">
          <div className="flex items-center justify-between">
            <button className='h-[62px] xl:w-[149px] w-fit lg:px-6 px-4 bg-black text-white rounded-[20px] font-poppins xl:text-[20px] lg:text-[18px] text-[15px] xl:leading-[30px] leading-5'>Gallery</button>
            <div className="flex xl:gap-9 lg:gap-5 gap-3">
              <button
                onClick={handleButtonClick}
                className="xl:w-[131px] w-fit lg:px-6 px-3 h-[46px] lg:text-[12px] text-[11px] leading-[6.29px] font-extrabold text-white rounded-[104px] shadow-custom-combined-btn text-center font-plusJak">
                <span className="lg:text-[12.1px] text-[11.1px] -translate-y-[1px] inline-block mr-1">+</span>
                Add image
              </button>
              <div className="flex xl:gap-[19px] lg:gap-[15px] gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`px-4 py-2 shadow-sm-btn-shadow text-white rounded-full transition-all duration-200 bg-sm-btn-gradient ${currentIndex === 0 ? "hover:scale-100" : "hover:scale-110"}`}>
                  <FaArrowLeft className='text-[#6f787c]' />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === images.length - 1}
                  className={`px-4 py-2 shadow-sm-btn-shadow bg-sm-btn-gradient text-white rounded-full ${currentIndex === images.length - 1 ? "hover:scale-100" : "hover:scale-110"}`}>
                  <FaArrowRight className='text-[#6f787c]' />
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-0 top-1">
            <CardSideDock />
          </div>
          <div className="flex xl:gap-[20px] lg:gap-4 gap-3 mt-[47px] ">
            {getVisibleImages().map((src, index) => (
              <div className="relative h-[179px] xl:w-[190px] w-full "
                key={index}
              >
                <Image
                  src={src}
                  fill
                  alt={`Gallery Image - ${index + 1}`}
                  className='rounded-[24px] object-cover grayscale hover:grayscale-0 hover:scale-x-[1.15] hover:scale-y-[1.14] duration-700 ease-in-out transform transition-all hover:rotate-[-1deg] '
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[22px]">
          <HrLine />
        </div>
      </section>
      {
        isModalOpen && (
          <ImageUploadModal
            isOpen={isModalOpen}
            onClose={handleClose}
          />
        )
      }
    </>
  )
}

export default Gallery