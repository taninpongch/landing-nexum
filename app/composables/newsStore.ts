import { defineStore } from "pinia";

export type NewsStatus = "update" | "announcement";

export type NewsItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  status: NewsStatus;
  statusText: "อัพเดต" | "ประกาศ";
  badgeColor: "success" | "warning" | "primary" | "secondary" | "info" | "error" | "neutral";
};

export const useNewsStore = defineStore("newsStore", () => {
  // const { handleApiError } = useHandleApiError();

  // const getUrl = ref();
  // const { data: getRsp, error: getError, status: getStatus, execute: executeGet } = useApiFetch<any>(() => getUrl.value, { method: "GET", key: "get-company-detail", immediate: false });


  const dataNews = ref<NewsItem[]>([
    {
      id: 1,
      title: '[เครดิต] ระงับเครดิตและยกเลิกระงับเครดิต',
      description: 'สามารถใช้ผ่านเว็บและแอปได้แล้ว',
      date: '12/6/2569 09.00',
      status: 'update',
      statusText: 'อัพเดต',
      badgeColor: 'success'
    },
    {
      id: 2,
      title: '[จ่าเงินเดือน] ไล่พนักงานออก',
      description: 'สามารถใช้ผ่านเว็บและแอปได้แล้ว',
      date: '12/6/2569 09.00',
      status: 'update',
      statusText: 'อัพเดต',
      badgeColor: 'success'
    }
  ]);

  function addNews(payload: { title: string; description: string; status: NewsStatus; }) {
    const isAnnouncement = payload.status === "announcement";

    dataNews.value.unshift({
      id: Date.now(),
      title: payload.title,
      description: payload.description,
      date: new Date().toLocaleString("th-TH"),
      status: payload.status,
      statusText: isAnnouncement ? "ประกาศ" : "อัพเดต",
      badgeColor: isAnnouncement ? "warning" : "success"
    });
  }

  return {
    data: dataNews,
    addNews
  };
});

// Keep backward compatibility with previous naming used in pages.
export const useCompanyStore = useNewsStore;