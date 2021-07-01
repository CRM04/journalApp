
export const uploadIMG = async (file) => {
    const urlCloud = ' https://api.cloudinary.com/v1_1/duyy4neht/image/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const res = await fetch(urlCloud, {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const data = await res.json();
            return data.secure_url;
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}