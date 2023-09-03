import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Riwayat() {
  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  };
  const [transaksi, setTransaksi] = useState([]);
  const [meja, setMeja] = useState([]);
  const [nomor_meja, setNomorMeja] = useState("");
  const [search, setValue] = useState("");
  useEffect(() => {
    const fecthDatas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/transaksi/", {
          headers,
        });
        console.log(response.data.data);
        setTransaksi(response.data.data);

        const res = await axios.get("http://localhost:8000/meja/", { headers });
        console.log(res.data.data);
        setMeja(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthDatas();
  }, []);

  const handleChange = (e) => {
    console.log(transaksi);
    setValue(e.target.value);
    const dataFilterred = transaksi.filter((data) => {
      return data.meja.nomor_meja === e.target.value;
    });
    setTransaksi(dataFilterred);
  };

  const handleBayar = async (id) => {
    const selectedTransaksi = transaksi.find((select) => select.id === id);
     const selectedMeja = meja.find((select) => select.id === selectedTransaksi.meja.id)

    const updatedStatusTransaksi = {
      ...selectedTransaksi,
      status: "lunas",
    };
    const updatedStatusMeja = {
        ...selectedMeja,
        status: "tersedia"
    }

    try {
      await axios.put(
        "http://localhost:8000/transaksi/" + id,
        updatedStatusTransaksi,
        { headers }
      );
       await axios.put("http://localhost:8000/meja/" + selectedMeja.id, updatedStatusMeja, {headers})
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // const handleRemove = async (id_transaksi) => {
  //     try {
  //         const selectedTransaksi = transaksi.find((select) => select.id_transaksi === id_transaksi)
  //         const selectedMeja = meja.find((select) => select.id_meja === selectedTransaksi.meja.id_meja)

  //         const updatedStatusMeja = {
  //             ...selectedMeja,
  //             status: "tersedia"
  //         }

  //         await axios.delete("http://localhost:8000/transaksi/" + id_transaksi, {headers});
  //         await axios.put("http://localhost:8000/meja/" + selectedMeja.id_meja, updatedStatusMeja, {headers})
  //         window.location.reload()
  //     } catch (error) {
  //         console.error(error);
  //     }

  // }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          handleChange(e);
        }}
        name="seach"
        placeholder="Search by nomor meja"
        className="w-32 py-2 pl-10 ml-10 mt-5 text-sm rounded-md sm:w-auto focus:outline-none text-black bg-gray-200 "
      />
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nama Pelanggan
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Alamat
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Nomor Meja
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                menu
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                harga asli
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Status
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                
              </th>
            </tr>
          </thead>

          {/* <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                menu 
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                harga asli
              </th>
            </tr>
            </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {menus.map((menu)  => (
               <tr key={menu.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{menu.harga}</td>
               </tr>
              ))}
          </tbody>
      </table> */}

          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {transaksi.map((transaksi)  => (
              <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                <td className="px-6 py-4">{transaksi.nama_pelanggan}</td>
                <td className="px-6 py-4">{transaksi.alamat}</td>
                <td className="px-6 py-4">
                  Meja nomor {transaksi.meja.nomor_meja}
                </td>
    
                {/* <ul>
                    {transaksi.menus.map((menu) => (
                      <li className="px-6 py-4" key={menu.id}>
                        {menu.harga}
                      </li>
                    ))}
               </ul> */}
                <td className="px-6 py-4" class="menu">{transaksi.harga}</td>
                <td className="px-6 py-4" clas="harga asli  ">-</td>
                <td className="px-6 py-4">{transaksi.total}</td>
                <td className="px-6 py-4">
                  {transaksi.status === "belum_bayar" ? (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Belum Lunas
                      </span>
                      <button
                        onClick={() => handleBayar(transaksi.id)}
                        className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-rose-600"
                      >
                        Bayar
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                        Lunas
                      </span>
                    </div>
                  )}
                </td>
                {transaksi.status === "belum_bayar" ? (
                  <td className="px-6 py-4">
                    {/* <div className="flex justify-end gap-4">
                                            <button onClick={() => handleRemove(transaksi.id_transaksi)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" x-tooltip="tooltip">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>
                                            </a>
                                        </div> */}
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4"></div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
