import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Search from "@/components/Search";
import Title from "@/components/Title";
import PopularNews from "@/components/news/PopularNews";
import NewsCard from "@/components/news/items/NewsCard";
import SimpleDetailsNewCard from "@/components/news/items/SimpleDetailsNewCard";
import React from "react";
import htmlParser from 'html-react-parser';
import { base_api_url } from '../../../config/config';
import RelatedNews from "@/components/news/RelatedNews";
import RecentNews from "@/components/news/RecentNews";

const Details = async ({ params }) => {
  const { slug } = params;
  let news = null;
  let relateNews = [];

  try {
    const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
      next: {
        revalidate: 1
      }
    });

    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    const data = await res.json();
    news = data?.news || null;
    relateNews = data?.relateNews || [];

  } catch (error) {
    console.error("Error fetching news details:", error);
    // news remains null and relateNews an empty array in case of an error
  }

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one="sports" two={news?.title || "News"} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <div className="flex flex-col gap-y-5 bg-white">
                  {news?.image ? (
                    <img src={news.image} alt={news.title} />
                  ) : (
                    <p>No image available</p>
                  )}
                  <div className="flex flex-col gap-y-4 px-6 pb-6">
                    <h3 className="text-red-700 uppercase font-medium text-xl">{news?.category || "Category"}</h3>
                    <h2 className="text-3xl text-gray-700 font-bold">{news?.title || "News Title"}</h2>
                    <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                      <span>{news?.date || "Date"}/</span>
                      <span>{news?.writerName || "Writer Name"}</span>
                    </div>
                    <p>{news ? htmlParser(news.description) : "Description not available"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle={"text-gray-700 font-bold"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            {relateNews.length > 0 ? (
              <RelatedNews news={relateNews} type="Related news" />
            ) : (
              <p>No related news available</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;


// import Breadcrumb from "@/components/Breadcrumb";
// import Category from "@/components/Category";
// import Footer from "@/components/Footer";
// import Search from "@/components/Search";
// import Title from "@/components/Title";
// import PopularNews from "@/components/news/PopularNews";
// import NewsCard from "@/components/news/items/NewsCard";
// import SimpleDetailsNewCard from "@/components/news/items/SimpleDetailsNewCard";
// import React from "react";
// import htmlParser from 'html-react-parser'
// import { base_api_url } from '../../../config/config'
// import RelatedNews from "@/components/news/RelatedNews";
// import RecentNews from "@/components/news/RecentNews";

// const Details = async ({ params }) => {

//   const { slug } = params;

//   const res = await fetch(`${base_api_url}/api/news/details/${slug}`, {
//     next: {
//       revalidate: 1
//     }
//   })
//   const { news, relateNews } = await res.json()

//   return (
//     <div>
//       <div className="bg-white shadow-sm py-4">
//         <div className="px-4 md:px-8 w-full">
//           <Breadcrumb one="sports" two={"ABET accreditation reaffirms UTSA’s"} />
//         </div>
//       </div>
//       <div className="bg-slate-200 w-full">
//         <div className="px-4 md:px-8 w-full py-8">
//           <div className="flex flex-wrap">
//             <div className="w-full xl:w-8/12">
//               <div className="w-full pr-0 xl:pr-4">
//                 <div className="flex flex-col gap-y-5 bg-white">
//                   <img src={news?.image} alt="" />
//                   <div className="flex flex-col gap-y-4 px-6 pb-6">
//                     <h3 className="text-red-700 uppercase font-medium text-xl">{news?.category}</h3>
//                     <h2 className="text-3xl text-gray-700 font-bold">{news?.title}</h2>
//                     <div className="flex gap-x-2 text-xs font-normal text-slate-600">
//                       <span>{news?.date}/</span>
//                       <span>{news?.writerName}</span>
//                     </div>
//                     <p>{htmlParser(news?.description)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full xl:w-4/12">
//               <div className="w-full pl-0 xl:pl-4">
//                 <div className="flex flex-col gap-y-8">
//                   <Search />
//                   <RecentNews />
//                   <div className="p-4 bg-white">
//                     <Category titleStyle={"text-gray-700 font-bold"} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="pt-8">
//             <RelatedNews news={relateNews} type="Related news" />
//             {/* <PopularNews type="Related news" /> */}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Details;
