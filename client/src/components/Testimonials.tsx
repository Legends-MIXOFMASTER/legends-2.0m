import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "House of Legends transformed our corporate event with their creative cocktails and professional service. Our guests were impressed, and we've already booked them for our next event.",
    author: "Sarah Johnson",
    position: "Corporate Events Manager"
  },
  {
    content: "The training from Namibian Bar Masters has completely transformed our lodge's beverage program. Our staff is now confident in creating signature cocktails that showcase our local ingredients.",
    author: "Michael Tjiueza",
    position: "Lodge Manager"
  },
  {
    content: "Legends of Cocktails provided the perfect mobile bar setup for our wedding. Their attention to detail and personalized service made our special day even more memorable.",
    author: "David & Lisa Nangolo",
    position: "Wedding Clients"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">What Our Clients Say</h2>
          <p className="text-neutral text-lg max-w-3xl mx-auto">
            Hear from the individuals and businesses who have experienced our services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-md">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="text-secondary flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <p className="text-neutral italic mb-6">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-300 w-12 h-12 mr-4"></div>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-neutral">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
