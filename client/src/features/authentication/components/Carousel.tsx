import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import blogIllustration from "../../../assets/Blog post-bro.svg";
import commentIllustraion from "../../../assets/Status update-bro.svg";
import sharingIllustration from "../../../assets/Sharing articles-amico.svg";

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
			<SwiperSlide>
				<img src={blogIllustration} alt="nature on screen illustration" />
				<h3>Welcome, Wordsmith!</h3>
				<p>
					Your stories, ideas, and voice await. Log in and claim your digital
					pulpit. Rewrite craves your unique perspective.
				</p>
			</SwiperSlide>
			<SwiperSlide>
				<img src={commentIllustraion} alt="nature on screen illustration" />
				<h3>Your Opinions</h3>
				<p>
					Seeing a post that sparks a thought? Comments sections are an open mic
					for passionate voices like yours. Let's discuss!
				</p>
			</SwiperSlide>
			<SwiperSlide>
				<img src={sharingIllustration} alt="nature on screen illustration" />
				<h3>From your keyboard to the world!</h3>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Necessitatibus sunt beatae officia adipisci amet voluptatum iure
					deleniti sint nemo iste?
				</p>
			</SwiperSlide>
		</Swiper>
	);
}
