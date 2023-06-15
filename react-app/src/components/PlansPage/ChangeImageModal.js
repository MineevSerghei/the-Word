import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editPlanImageThunk } from "../../store/session";
// import { useHistory } from "react-router-dom";


export default function ChangeImageModal({ plan }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const history = useHistory();
    const [previewUrl, setPreviewUrl] = useState();
    const [image, setImage] = useState();

    useEffect(() => {

        if (previewUrl)
            URL.revokeObjectURL(previewUrl)

        if (image)
            setPreviewUrl(URL.createObjectURL(image))

        return () => {
            if (previewUrl)
                URL.revokeObjectURL(previewUrl)
        }

    }, [image])


    const changeImage = async (e) => {

        const formData = new FormData();

        formData.append("image", image);

        await dispatch(editPlanImageThunk(formData, plan.id));

        closeModal()
    };

    return (
        <>
            <h3>Select New Image:</h3>
            <label className="label-plan-form"><input type="file" accept=".png,.jpg,.jpeg" onChange={e => setImage(e.target.files[0])} /></label>
            {image ? <div className='plan-img-container-edit'><img className="plan-img" src={previewUrl} alt={`Image for plan: ${plan.name}`}></img></div> : <br></br>}

            <div className="flex-col gap10">
                <button className="bttn-face" onClick={changeImage}>Confirm</button>
                <button className="bttn-face" onClick={() => closeModal()}>Cancel</button>
            </div>
        </>
    );
}
