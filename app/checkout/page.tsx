import Header from "@/components/Header";
import Stripe from "@/components/Stripe";

export default function Page() {
  return (
    <div className="">
      <Header />
      <div className="flex justify-center flex-col p-20">

      <Stripe />
      </div>
    </div>
  );
}
