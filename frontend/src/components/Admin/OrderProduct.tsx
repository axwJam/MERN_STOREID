import { FC } from "react";
import { typeHistoryOrder } from "../../utils/products/type";
import NumberFormatter from "../NumberFormatter";

const OrderProduct: FC<typeHistoryOrder> = (props: typeHistoryOrder) => {
  const { price, nama_lengkap, description, stock, brand, type, image, hapus, status, check } = props;
  return (
    <div id="profileInfo" className="flex gap-5 bg-[#E5F3FF] md:p-8 p-2 rounded-md">
      <img id="profileImage" src={image} alt="person" className="rounded-md  h-1/2 w-1/4" />
      <div className="flex flex-col w-full gap-3">
        <div className="div flex justify-between">
          <span id="profileName" className="font-semibold md:text-xl text-base place-self-end">
            Nama Pelanggan : {nama_lengkap}
          </span>
          <span className="ml-5 rounded-md py-2 px-4 text-black border-2 border-blue-400 border-opacity-60">{status}</span>
        </div>
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Nama Produk : {brand} {type}
        </span>
        <span id="profileUsername" className="text-[#999999] text-xs md:text-base">
          Alamat : {description}
        </span>
        <span id="profilePhone" className="text-[#999999] text-xs md:text-base">
          Quantity : {stock}
        </span>
        <span id="profileEmail" className="text-[#999999] text-xs md:text-base">
          <NumberFormatter value={price} />
        </span>
        <div className="flex items-center gap-5 mt-2">
          {check && status !== "Selesai" && (
            <button onClick={hapus} className="md:px-3 md:py-2 p-2 text-sm md:text-base bg-red-400 rounded-md  text-white">
              Ubah Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderProduct;
