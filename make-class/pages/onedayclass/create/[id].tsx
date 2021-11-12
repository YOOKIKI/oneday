import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AppDispatch, RootState } from "../../../provider";
import {
  requestAddOnedayNext,
  requestAddOnedayPaging,
} from "../../../middleware/modules/oneday";
import { OnedayItem } from "../../../provider/modules/oneday ";
import Layout from "../../../components/layout";

const create = () => {
  const onedayclassNameInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const descriptionTxta = useRef<HTMLTextAreaElement>(null);
  const capacityInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const startDateDataInput = useRef<HTMLInputElement>(null);
  const endDateDataInput = useRef<HTMLInputElement>(null);

  const onedayData = useSelector((state: RootState) => state.oneday.data);
  const isAddCompleted = useSelector(
    (state: RootState) => state.oneday.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    console.log("--isAddCompleted 변경: " + isAddCompleted);

    isAddCompleted && router.push("/oneday");
  }, [isAddCompleted, router, dispatch]);

  const handleAddClick = () => {
    if (fileInput.current?.files?.length) {
    }

    if (fileInput.current?.files?.length) {
      const imageFile = fileInput.current.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const item: OnedayItem = {
          id: onedayData.length ? onedayData[0].id + 1 : 1,
          onedayclassName: onedayclassNameInput.current
            ? onedayclassNameInput.current.value
            : "",
          price: priceInput.current ? priceInput.current.value : "",
          description: descriptionTxta.current
            ? descriptionTxta.current.value
            : "",
          capacity: capacityInput.current ? capacityInput.current.value : "",
          photoUrl: reader.result ? reader.result.toString() : "",
          fileType: imageFile.type,
          fileName: imageFile.name,
          createdTime: new Date().getTime(),
          startDateData: startDateDataInput.current
            ? startDateDataInput.current.value
            : "",
          endDateData: endDateDataInput.current
            ? endDateDataInput.current.value
            : "",
        };

        console.log(item);
        dispatch(requestAddOnedayNext(item));
      };

      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Layout>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">원데이클래스 예약</h2>
        <form>
          <table className="table">
            <tbody>
              <tr>
                <th>제목</th>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    ref={onedayclassNameInput}
                  />
                </td>
              </tr>
              <tr>
                <th>설명</th>
                <td>
                  <textarea
                    className="form-control"
                    style={{ height: "40vh" }}
                    ref={descriptionTxta}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <th>이미지</th>
                <td>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <div>
          <button
            className="btn btn-secondary float-start"
            onClick={() => {
              router.push("/oneday");
            }}
          >
            <i className="bi bi-grid-3x3-gap me-1"></i>
            목록
          </button>
          <button
            className="btn btn-primary float-end"
            onClick={() => {
              handleAddClick();
            }}
          >
            <i className="bi bi-check" />
            저장
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default create;
