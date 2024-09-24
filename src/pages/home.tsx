import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { TbTruckDelivery } from "react-icons/tb";
import { LuShieldCheck } from "react-icons/lu";
import { FaHeadset } from "react-icons/fa";
import { Slider } from "6pp";
import { motion } from "framer-motion";


const banners = [
  "https://res.cloudinary.com/dsipqofya/image/upload/v1727163453/banner/jzxkphetmtdiqc00ryle.jpg",
  "https://res.cloudinary.com/dsipqofya/image/upload/v1727163453/banner/sguxmv3cnp9smzwiurto.jpg",
];

const services = [
  {
    icon: <TbTruckDelivery />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $200",
  },
  {
    icon: <LuShieldCheck />,
    title: "SECURE PAYMENT",
    description: "100% secure payment",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 SUPPORT",
    description: "Get support 24/7",
  },
];

const Home = () => {


  const {data, isLoading, isError} = useLatestProductsQuery("");
  const ph = data?.products.map((i)=>(
    i
  ));
  console.log(ph);
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  if(isError) toast.error("Cannot Fetch the Products");

  return (
    <>
    <div className="home">
      {/* <section></section> */}
      <div>
      <Slider
            autoplay
            autoplayDuration={1500}
            showNav={false}
            images={banners}
          />
      </div>

      <h1>Latest Products
        <Link to="/search" className="findmore">
        More
        </Link>
      </h1>

      <main>
        {
          isLoading
          ?<Skeleton width="80vw" /> 
          : (data?.products.map((i)=>(
            <ProductCard
              key={i._id} 
              productId={i._id}
              name={i.name} 
              price={i.price} 
              stock={i.stock} 
              handler={addToCartHandler}
              photos={i.photos} />
          ))
        )
        }
      </main>
    </div>
    <article className="our-services">
        <ul>
          {services.map((service, i) => (
            <motion.li
              initial={{ opacity: 0, y: -100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: i / 20,
                },
              }}
              key={service.title}
            >
              <div>{service.icon}</div>
              <section>
                <h3>{service.title}Y</h3>
                <p>{service.title}</p>
              </section>
            </motion.li>
          ))}
        </ul>
      </article>
    </>
  )
}

export default Home