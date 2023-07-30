import axios from "axios";

function YandexDiskUpload() {
    
    const accessToken = 'y0_AgAAAABu2p5HAAo-EQAAAADov_0AiftvwZUSTJmJTrWKqoQIy_INpXk';

    const handleFileChange = async (event) => {
        const files = event.target.files;
        if (!files) return;

        const maxFilesCount = 100;

        try {
            if (files.length > maxFilesCount) {
                console.error(`Максимальное количество файлов для загрузки - ${maxFilesCount}`);
                return;
            }

            for (const file of files) {
                const uploadLinkResponse = await axios.get('https://cloud-api.yandex.net/v1/disk/resources/upload', {
                    headers: {
                        Authorization: `OAuth ${accessToken}`,
                    },
                    params: {
                        path: 'disk:/foo' + file.name,
                        overwrite: true,
                    },
                });

                const formData = new FormData();
                formData.append('file', file);
                const uploadResponse = await axios.put(uploadLinkResponse.data.href, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                alert('Файл успешно загружен:', uploadResponse.data);
            }
        } catch (error) {
            alert('Ошибка загрузки файла:', error);
        }
    }

    return (
        <div>
            <h1>Загрузить файл на Яндекс.Диск</h1>
            <input type="file" onChange={handleFileChange} multiple />
        </div>
    )
}

export default YandexDiskUpload;