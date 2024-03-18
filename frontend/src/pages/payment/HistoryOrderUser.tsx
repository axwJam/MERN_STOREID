import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OrderProduct from "../../components/Admin/OrderProduct";
import { infoAlertFC } from "../../utils/functions";
import Swal from "sweetalert2";

const HistoryOrderUser = () => {
  const authToken = Cookies.get("authToken");
  const [dataUser, setDataUser] = useState({
    data: [],
  });

  const cekData = async () => {
    try {
      const response = await axios.get("http://localhost:5555/my-payment", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setDataUser(response);
    } catch (error) {
      infoAlertFC("Warning", "Anda Belum Punya Riwayat Order", "warning");
    }
  };

  useEffect(() => {
    cekData();
  }, []);

  const ubahStatus = (id: any) => {
    Swal.fire({
      title: "Confirmation",
      text: "Anda ingin mengubah Status?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "NO",
      confirmButtonColor: "rgb(255 10 10)",
    }).then((res: any) => {
      if (res.isConfirmed) {
        axios
          .put(
            `http://localhost:5555/payment/${id}`,
            { status: "Selesai" },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then(() => {
            Swal.fire({
              title: "Confirmation",
              text: "Status Produk Berhasil diubah",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "rgb(255 10 10)",
            });
            cekData();
          });
      }
    });
  };
  return (
    <>
      <div id="main-container" className="  flex flex-col pt-12 gap-8 font-Poppins">
        <div id="header-info" className="flex flex-col md:px-20 px-5">
          <span id="header-title" className="md:text-3xl text-2xl md:text-left text-center font-Poppins">
            Riwayat Pesanan
          </span>
          <span id="header-description" className="text-[#828282] text-xs md:text-base">
            Lihat informasi mengenai Riwayat saya
          </span>
        </div>

        <div id="users-container" className="flex justify-center items-center">
          <div id="users-list" className="flex flex-col lg:h-[60vh] h-[35vh] gap-5 mb-20 border-2 border-slate-50 p-2 md:p-5 overflow-y-scroll w-full">
            {dataUser.data.map((item: any, key: number) => (
              <OrderProduct
                key={key}
                price={item.grossAmount}
                nama_lengkap={item.nama_lengkap}
                description={item.alamat}
                type={item.type}
                image={item.image}
                brand={item.brand}
                stock={item.quantity}
                status={item.status}
                hapus={() => ubahStatus(item._id)}
                check={true}
              />
            ))}

            {(!dataUser || !dataUser.data || dataUser.data.length === 0) && (
              <div className="flex items-center w-full justify-center h-[20vh] md:h-40">
                <p className="text-2xl text-gray-500">Tidak ada data.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryOrderUser;
