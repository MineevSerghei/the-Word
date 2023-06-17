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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (previewUrl)
            URL.revokeObjectURL(previewUrl)

        if (image)
            if (image.size > 2 * 1024 * 1024)
                setPreviewUrl('tooLarge')
            else
                setPreviewUrl(URL.createObjectURL(image))

        return () => {
            if (previewUrl)
                URL.revokeObjectURL(previewUrl)
        }

    }, [image])


    const changeImage = async (e) => {

        if (!image) return;

        if (previewUrl === 'tooLarge') return;

        setIsLoading(true)

        const formData = new FormData();

        formData.append("image", image);

        await dispatch(editPlanImageThunk(formData, plan.id));

        setIsLoading(false)

        closeModal()
    };

    return (
        <>
            <h3>Select New Image:</h3>
            <label className="label-plan-form"><input className="image-input" type="file" accept=".png,.jpg,.jpeg" onChange={e => setImage(e.target.files[0])} /></label>
            {image ? (previewUrl === 'tooLarge' ? <div className='plan-img-container-edit'><br></br><p className="error">Image size cannot exceed 2MB</p></div> : <div className='plan-img-container-edit'><img className="plan-img" src={previewUrl} alt={`Image for plan: ${plan.name}`}></img></div>) : <br></br>}

            {isLoading ? <div className="loading-div"><i className="fa-solid fa-spinner fa-spin-pulse loading-icon"></i></div> : <div className="flex-col gap10">
                <button className="bttn-face" onClick={changeImage}>Confirm</button>
                <button className="bttn-face" onClick={() => closeModal()}>Cancel</button>
            </div>}
        </>
    );
}
