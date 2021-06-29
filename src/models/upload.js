const mongoose = require('mongoose');
const { post } = require('../routes/indexRouter');

const s3 = new aws.S3();

const uploadSchema = new mongoose.Schema({
    //Nome do arquivo 
    name: String,
    //Tamanho do arquivo
    size: Number,
    //Nome que é gerado junto com hash
    key: String,
    //Utilizada para Amazon S3, esse valor vai armazenar a url que o arquivo está contido
    url: String,
    //Gravação da data que esse registro foi criado
    createdAt: {
        type: Date,
        //Salvar a hora atual que o post foi criado
        default: Date.now,
    }
});

PostSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`;
    }
});

PostSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE == 's3') {
        return s3.deleteObject({
            Bucket: 'projetaiexample',
            Key: this.key,
        }).promise()
    } else {
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    }
});

mongoose.model('Project', projectSchema);