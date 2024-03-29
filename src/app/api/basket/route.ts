import BasketService from "@/lib/basket/service";

export async function POST(request: Request, res: Response) {
  const basket = await request.json();

  const service = await BasketService.getBasket({
    basket,
  });
  return Response.json(service.data);
}
