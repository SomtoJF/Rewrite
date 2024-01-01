import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "./LeftAside.styles.sass";

export default function Carousel() {
	return (
		<Swiper
			pagination={{ clickable: true }}
			modules={[Pagination, Autoplay]}
			autoplay={{ delay: 5000, disableOnInteraction: false }}
			centeredSlides={true}
			direction="horizontal"
			spaceBetween={20}
		>
			<SwiperSlide
				style={{
					backgroundImage:
						"url(https://images.pexels.com/photos/15953092/pexels-photo-15953092/free-photo-of-stylish-woman-in-sunglasses-posing-on-grey-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
				}}
			>
				<h3>Welcome, Wordsmith!</h3>
				<p>
					Your stories, ideas, and voice await. Log in and claim your digital
					pulpit. Rewrite craves your unique perspective.
				</p>
			</SwiperSlide>
			<SwiperSlide
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1692707215406-30a50d27f1ad?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				}}
			>
				<h3>Your Opinions</h3>
				<p>
					Seen a post that sparks a thought? Comments sections are an open mic
					for passionate voices like yours. Let's discuss!
				</p>
			</SwiperSlide>
			<SwiperSlide
				style={{
					backgroundImage:
						"url(https://images.unsplash.com/photo-1703798278589-245f6e47cf8b?q=80&w=3027&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
				}}
			>
				<h3>From your keyboard to the world!</h3>
				<p>
					Join a vibrant tapestry of voices, exchange ideas, and leave your mark
					on the world, one post at a time.
				</p>
			</SwiperSlide>
		</Swiper>
	);
}
