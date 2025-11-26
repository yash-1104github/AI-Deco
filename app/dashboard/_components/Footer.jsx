import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="bg-muted/30 py-6 px-4 border-t mt-12">
        <div className="container mx-auto">
          <div className="flex  flex-row justify-between items-center">
            <div className="hidden md:block text-center md:text-left mb-6 md:mb-0">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className=" w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <Image src={"/logo.svg"} width={40} height={40} />
                </div>
                <h3 className="text-xl font-bold gradient-title">AI Deco</h3>
              </div>
              <div className=" text-sm text-muted-foreground">
                © 2025 All rights reserved.
              </div>
            </div>

            <div className="text-center">
              <div className="font-medium text-xl text-muted-foreground">
                Developed by{" "}
                <span className="text-primary font-bold text-3xl">
                  Yash Gupta{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
