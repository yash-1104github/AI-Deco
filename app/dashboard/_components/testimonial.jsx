import { ArrowRight, Sparkles, Palette, Lightbulb, Zap } from "lucide-react";
import { testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";

export function Testimonial() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h2 className="text-center tracking-wide text-4xl md:text-5xl font-semibold mb-12 gradient-title">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              className="py-1 md:py-3 px-1 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 animate-fade-in"
            >
              <CardContent className="pt-2">
                <div className="gap-2 flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full -ml-4"
                  />
                  <div className="">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-900">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                <div className="mt-4 ">
                  <div className="text-gray-500 text-base w-full mt-2 font-light justify-between ">
                    "{testimonial.quote}"
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export function Features() {
  return (
    <>
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-title">AI Deco</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of interior design with our cutting-edge AI
              technology
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
    </>
  );
}
