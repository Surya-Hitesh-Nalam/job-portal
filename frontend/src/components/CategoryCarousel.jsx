/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from './ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
const category = [
    'frontend developer',
    'backend developer',
    'data science',
    'graphic designer',
    'fullstack developer',
    'software developer'
]
const CategoryCarousel = () => {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
            <CarouselContent>
                {
                    category.map((cat,index)=>(
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                            <Button variant='outline'className='rounded-full'>{cat}</Button>
                        </CarouselItem>
                    ))
                }
                
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel