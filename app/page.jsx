import { Button } from "@/components/ui/button"
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import { testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <div  className='fixed top-0 w-full bg-white/80 backdrop-blure-md z-50 border-b'>
        <Header />
      </div>
        <div className=" mt-40 pb-10 px-4 container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl pb-6  gradient-title">AI Room and Home <br />Interior Design</h1>
          <p className="text-xl mt-5 text-gray-600 mb-8  mx-auto">Transform Your Space with AI: Effortless Room & Home Interior Design at Your Fingertips!</p>

          <div className="mt-10 font-semibold">
            <Link href={'/dashboard'}>
              <Button
                className="w-[180px] h-[50px] text-lg animate-bounce">Get Started</Button>
            </Link>
          </div>

          <div className="py-16">
            <Image src="/rts.png" width={1000}
              height={400}
              alt="Preview"
              className="rounded-lg shadow-2xl mt-2 border mx-auto"
            />
          </div>

        </div>


        <section className="py-5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-16">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="pt-2">
                    <div className="flex items-center mb-4">
{/*                       <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      /> */}
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testimonial.quote}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
