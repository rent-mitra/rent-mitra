import React, { useState } from "react";
import "./home.css";

const Home = () => {
  // Mock data for items
  const recommendations = [
    {
      id: 1,
      image:
        "https://fdn.gsmarena.com/imgroot/reviews/22/apple-iphone-14-pro-max/-347x151/gsmarena_002.jpg",
      price: "₹40,000",
      title: "Selling 14 Pro Max 128 GB 98% Battery...",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 2,
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/iphone-15-pro-hands-on-lead-cnnu.jpg?c=16x9",
      price: "₹22,999",
      title: "With accessories iPhone 15 Available...",
      location: "Samudrapur MIDC, Maharashtra",
      date: "3 days ago",
    },
    {
      id: 3,
      image:
        "https://www.theautomotiveindia.com/forums/attachments/img-20160628-wa0003-jpg.205126/",
      price: "₹65,000",
      title: "Bajaj Pulsar 220f 2018 - 64,000 km",
      location: "Samudrapur, Maharashtra",
      date: "Yesterday",
    },
    {
      id: 4,
      image:
        "https://motoavenue.in/wp-content/uploads/2024/02/220-visor.jpg.webp",
      price: "₹60,000",
      title: "Selling my Bajaj Pulsar 220f 2021 - 64,000 km",
      location: "Samudrapur, Maharashtra",
      date: "Yesterday",
    },
    {
      id: 5,
      image:
        "https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw8f4fe21c/images/Fastrack/Catalog/38074AP01_1.jpg?sw=600&sh=600",
      price: "₹450",
      title: "Smart watch for men's small price..",
      location: "Samudrapur, Maharashtra",
      date: "2 days ago",
    },
    {
      id: 6,
      image:
        "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f03956b-f9f6-41f2-a1af-c9e218ae6af9_1280x720.jpeg",
      price: "₹600",
      title: "We have a latest Ear Buds more...",
      location: "Samudrapur, Maharashtra",
      date: "2 days ago",
    },
    {
      id: 7,
      image:
        "https://rukminim2.flixcart.com/image/850/1000/klwmufk0/bag/w/i/y/lightweight-school-bags-backpacks-for-boys-girls-stylish-men-and-original-imagyxe32zzd2n7e.jpeg?q=90&crop=false",
      price: "₹320",
      title: "Solid 35 liter casual bags...",
      location: "Samudrapur, Maharashtra",
      date: "1 week Ago",
    },
    {
      id: 8,
      image:
        "https://i.insider.com/66d75a8a14a5cd1fcc8cd716?width=1200&format=jpeg",
      price: "₹250",
      title: "Latest collection of women's Hand Bags",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 9,
      image:
        "https://rjmobile01.com/cdn/shop/files/16C5AED3-A088-49FD-B949-81A5B63B4BF4.jpg?v=1723928409&width=800",
      price: "₹1500",
      title: "We have latest 5G watch.....",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 10,
      image:
        "https://contents.mediadecathlon.com/p2717157/3d554d6f91b7be5c5ddd53246451b37a/p2717157.jpg?format=auto&quality=70&f=2520x0",
      price: "₹500",
      title: "Sports shoes in good quality",
      location: "Samudrapur, Maharashtra",
      date: "Yesterday",
    },
    {
      id: 11,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2022/7/KU/IQ/PW/65759864/360-rotating-water-saving-sprinkler-500x500.jpg",
      price: "₹450",
      title: "New Automatic 360  Rotating.....",
      location: "Samudrapur, Maharashtra",
      date: "Yesterday",
    },
    {
      id: 12,
      image:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/headphone/f/o/x/-original-imagt3vwg7vvt7sf.jpeg?q=20&crop=false",
      price: "₹320",
      title: "Earbuds with 360 Audio",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 13,
      image:
        "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/23371508/2023/5/24/aaf7a3d8-edae-4368-951b-8fd3a2aeca9f1684921580264Leadcat20UnisexSlides1.jpg",
      price: "₹650",
      title: "Availbale with many more....",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 14,
      image:
        "https://ii1.pepperfry.com/media/catalog/product/f/o/494x544/foster-acacia-wood--chair-in-honey-oak-finish-with-natural-cane-and-leatherette-foster-acacia-wood---n1pj7h.jpg",
      price: "₹350",
      title: "Chairs Available in Small prices..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 15,
      image:
        "https://rukminim2.flixcart.com/image/850/1000/kvba7bk0/projector/b/d/k/t4-mini-portable-projector-with-screen-mobile-phone-projector-original-imag8925gwuzhuay.jpeg?q=90&crop=false",
      price: "₹9000",
      title: "Decoded Projector with Wi-Fi..",
      location: "Samudrapur, Maharashtra",
      date: "1 Day Ago",
    },
    {
      id: 16,
      image:
        "https://cdn.pixabay.com/photo/2015/06/25/17/21/smart-watch-821557_640.jpg",
      price: "₹900",
      title: "Smart Watch Collection..",
      location: "Samudrapur, Maharashtra",
      date: "1 Day Ago",
    },
    {
      id: 17,
      image:
        "https://manyavar.scene7.com/is/image/manyavar/ULB4619V_418-ORANGE.5503_23-09-2023-20-34:650x900",
      price: "₹9000",
      title: "Wedding Lehanga Available",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 18,
      image:
        "https://hanureddyrealty.com/wp-content/themes/hrrindia/scripts/timthumb.php?src=http://www.hanureddyrealty.com/wp-content/uploads/199133_WhatsApp%20Image%202017-08-17%20at%202.11.34%20PM.jpeg&w=700&h=420",
      price: "₹40,00,000",
      title: "House for sale..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 19,
      image:
        "https://www.digitaltrends.com/wp-content/uploads/2023/09/iphone-15-green-hand.jpg?p=1",
      price: "₹55,000",
      title: "iphone 15 Pro in Best price..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 20,
      image: "https://vescocycles.com/cdn/shop/files/01.jpg?v=1708425722",
      price: "₹20,000",
      title: "The new Cycle is for sale",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 21,
      image:
        "https://www.hdbfs.com/themes/custom/hdbfs/images/blog/750x350_Top-5-Refrigerators.webp",
      price: "₹40,000",
      title: "Fridge in the Best Price",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 22,
      image:
        "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2021%2F10%2F26%2Faiphone13pm-fcvs-sel-1-1037991-1635242483.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
      price: "₹35,000",
      title: "Iphone 13Pro..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 23,
      image:
        "https://leestarindia.com/wp-content/uploads/2022/01/LEESTAR-LE-826_Mixer-Grinder-Packaging_C2C.jpg",
      price: "₹800",
      title: " New Grinder in Best Prices",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 24,
      image:
        "https://media.istockphoto.com/id/1440977634/photo/vertical-shot-of-the-beautiful-pink-dress-isolated-on-the-white-background.jpg?s=612x612&w=0&k=20&c=3lSPxjs-xh7PGeW2eGnPlawyw9gcJPlnc1QWnwnkNyI=",
      price: "₹500",
      title: "latest Collections with more...",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 25,
      image:
        "https://www.tvsmotor.com/-/media/28DECBlogs/15-Amazing-TVS-iQube-Connected-Features.jpg",
      price: "₹22,000",
      title: "Electric Scooter..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 26,
      image:
        "https://www.housingtarget.com/StaticFiles/media/432253/Cache/house_411.webp",
      price: "₹35,00,000",
      title: "House for Sale",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 27,
      image:
        "https://ramrajcotton.in/cdn/shop/files/6_dfbcac91-869c-4cff-afc5-8ad61f087298.jpg?v=1692939872&width=1080",
      price: "₹250",
      title: "Printed Kurti..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 28,
      image: "https://apollo.olx.in/v1/files/wba7pdzqcimt1-IN/image;s=360x0",
      price: "₹1200",
      title: "New Titan Watch for sell..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 29,
      image:
        "https://images.unsplash.com/photo-1694956792421-e946fff94564?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cm95YWwlMjBlbmZpZWxkJTIwYnVsbGV0fGVufDB8fDB8fHww",
      price: "₹2,35,000",
      title: "Royal Enfield Bullet..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 30,
      image:
        "https://dt5rjsxbvck7d.cloudfront.net/eyJidWNrZXQiOiJtdHZkZWFsZXJhcHB1cyIsImtleSI6IjU1OTAxMi82NmVmZjUyMDdhNTkwMTU4MzUzNmU1YjMtMjAyNC0wOS0yMi0xMC00NC00OC9pbWFnZTEuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjoyOTQsImhlaWdodCI6MjEzLCJmaXQiOiJmaWxsIn19fQ==",
      price: "₹3,20,000",
      title: "Suzuki Used Car for Sell...",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
    {
      id: 31,
      image:
        "https://5.imimg.com/data5/SELLER/Default/2023/6/313631877/RW/UP/RB/29310015/brown-wooden-furniture.jpg",
      price: "₹3000",
      title: "New Furniture for sell i best price..",
      location: "Samudrapur, Maharashtra",
      date: "Today",
    },
  ];

  // State to manage the number of items displayed
  const [visibleCount, setVisibleCount] = useState(15); // Initially show 6 items

  // Function to load more items
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10); // Show 6 more items on each click
  };

  return (
    <div>
      <div className="recommendations-section">
        <h2>Fresh Recommendations</h2>
        <div className="recommendations-container">
          {recommendations.slice(0, visibleCount).map((item) => (
            <div className="recommendation-card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="card-details">
                <h3>{item.price}</h3>
                <p>{item.title}</p>
                <span>{item.location}</span>
                <span>{item.date}</span>
              </div>
              <button className="favorite-button">❤️</button>
            </div>
          ))}
        </div>
        {visibleCount < recommendations.length && (
          <button className="load-more-button" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
