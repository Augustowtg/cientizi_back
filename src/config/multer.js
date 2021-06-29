//Requisição das bibliotecas utilizadas
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
    local: multer.diskStorage({
        //Praticamente a mesma coisa da dest aí em cima, a dest funciona como um fall back
        //Se não tiver nada definido no destionation, vai utilizar o dest
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        //Utilizada para criar um hash para anexar no inicio do nome do arquivo, garantindo nome único
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        },
    }),
    
    //Storage da AWS online
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'projetaiexample',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};

/**
 * Path é utilizada para definir um caminho para tal coisa, neste caso sendo utilizado para passar o caminho local da pasta tmp/uploads
 */

//Exportação de objeto com as configurações do multer
module.exports = {
    //Variavel que define qual o destino dos arquivos que será feito upload
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    //Definição do limite de tamanho de arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    //Função para filtrar o upload de arquivos (ainda permanece como imagem para teste)
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        //Se algum destes tipos de formato estiverem incluidos no arquivo enviado...
        if (allowedMimes.includes(file.mimetype)) {
            //Aceito
            cb(null, true);
        } else {
            //Tipo de arquivo inválido, fora dos tipos de arquivos filtrados permitidos
            cb(new Error('Invalid file type.'));
        }
    },
};//Requisição das bibliotecas utilizadas
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
    local: multer.diskStorage({
        //Praticamente a mesma coisa da dest aí em cima, a dest funciona como um fall back
        //Se não tiver nada definido no destionation, vai utilizar o dest
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        //Utilizada para criar um hash para anexar no inicio do nome do arquivo, garantindo nome único
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            });
        },
    }),
    //Storage da AWS online
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'projetaiexample',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            });
        },
    }),
};

/**
 * Path é utilizada para definir um caminho para tal coisa, neste caso sendo utilizado para passar o caminho local da pasta tmp/uploads
 */

//Exportação de objeto com as configurações do multer
module.exports = {
    //Variavel que define qual o destino dos arquivos que será feito upload
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    //Definição do limite de tamanho de arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    //Função para filtrar o upload de arquivos (ainda permanece como imagem para teste)
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            "application/pdf",
            "application/docx"
        ];

        //Se algum destes tipos de formato estiverem incluidos no arquivo enviado...
        if (allowedMimes.includes(file.mimetype)) {
            //Aceito
            cb(null, true);
        } else {
            //Tipo de arquivo inválido, fora dos tipos de arquivos filtrados permitidos
            cb(new Error('Invalid file type.'));
        }
    },
};