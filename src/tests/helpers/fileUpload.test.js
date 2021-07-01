import { uploadIMG } from "../../helpers/uploadImg";
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'duyy4neht',
    api_key: '339411979165217',
    api_secret: '1R5NGqVC3jfT_61rIAf63pyh958',
    secure: true
});

describe('uploadIMG helper test suit', () => {

    test('should upload an image to cloudinary  ', async (done) => {
        const response = await fetch('https://res.cloudinary.com/duyy4neht/image/upload/v1624991183/aucytvrp7josfgyv56zq.png');
        const imgBlob = await response.blob();
        const file = new File([imgBlob], 'img.jpg');
        const url = await uploadIMG(file);
        expect(typeof url).toBe('string');
        let imgID = url.split('/');
        imgID = imgID[imgID.length - 1].replace('.png', '');
        cloudinary.v2.api.delete_resources(imgID, {}, () => { done() });
    });

    test('should trow an error', async () => {
        const file = new File([], 'img.jpg');
        const url = await uploadIMG(file);
        expect(url).toBe(null);
    });


});
