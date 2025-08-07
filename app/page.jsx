import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "./dashboard/_components/Header";
import { testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { ArrowRight, Sparkles, Palette, Lightbulb, Zap } from "lucide-react";
import React from "react";

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
              <Button className="w-[150px] h-[50px]  md:w-[200px] md:h-[60px] text-lg animate-bounce">
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

        <section className="py-16 px-4 bg-gradient-secondary hidden md:flex">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="gradient-title">AI Deco</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of interior design with our cutting-edge
                AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 animate-fade-in">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get professional design suggestions in seconds, not days
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 animate-fade-in">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms understand your style and preferences
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300 animate-fade-in">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Suggestions</h3>
                <p className="text-muted-foreground">
                  Intelligent recommendations tailored to your space and budget
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5">
          <div className="container mx-auto px-4">
            <h2 className="text-center tracking-wide text-4xl md:text-5xl font-semibold mb-12 gradient-title">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 ">
              {testimonialsData.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-4 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                >
                  <CardContent className="pt-2">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-900">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 justify-around text-lg ">
                      "{testimonial.quote}"
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-primary via-purple-600 to-primary my-10">
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

        <footer className="bg-muted/30 py-12 px-4 border-t mt-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold gradient-title">AI Deco</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  © 2025 All rights reserved.
                </p>
              </div>

              <div className="text-center">
                <div className="font-medium text-xl text-muted-foreground">
                  Developed by{" "}
                  <span className="text-primary font-bold text-3xl">Yash Gupta </span> 
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
