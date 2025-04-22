const SendRequestSQSConfig = () => {
    const queueUrl = '';
    const awsConfig = {
        region: '',
        credentials: {
            accessKeyId: '',
            secretAccessKey: '',
        },
    };

    return {
        queueUrl,
        awsConfig,
    };
};

export const sendRequestSQSConfig = SendRequestSQSConfig();
