import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import { ArrowRight, Sparkles } from "lucide-react";
import React from "react";
import Image from "next/image";
import Footer from "./dashboard/_components/Footer";
import { Features, Testimonial } from "./dashboard/_components/testimonial";

export default function Home() {
  return (
    <>
      <div>
        <div className="fixed top-0 w-full bg-white/80 backdrop-blure-md z-50 border-b">
          <Header />
        </div>

        <div className="mt-28 pb-10 px-4 container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Interior Design
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl pb-6  gradient-title">
            AI Room and Home <br />
            Interior Design
          </h1>
          <p className="text-xl mt-5 text-gray-600 mb-8  mx-auto">
            Transform Your Space with AI: Effortless Room & Home Interior Design
            at Your Fingertips!
          </p>

          <div className="mt-10 font-semibold">
            <Link href={"/dashboard"}>
              <Button className=" h-[50px]  w-[200px] md:h-[60px] text-lg animate-bounce">
                <div className="md:text-xl"> Get Started </div>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="py-16">
            <Image
              src="/rts.png"
              width={1000}
              height={400}
              alt="Preview"
              className="rounded-lg shadow-2xl mt-2 border mx-auto"
            />
          </div>
        </div>

        <section className="md:py-16 px-4 bg-gradient-secondary hidden md:flex">
          <Features/>
        </section>

        <section className="md:py-5">
          <Testimonial />
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-primary via-purple-600 to-primary my-16 ">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start your interior design journey today with AI-powered
                suggestions
              </p>
              <Link href="/dashboard">
                <Button
                  variant="secondary"
                  className="text-lg px-8 py-4 h-auto group bg-white text-primary hover:bg-white/90"
                >
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
