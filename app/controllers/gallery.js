'use strict';

const ImageStore = require('../utils/image-store');
/*

The Gallery controller allows the user to upload and delete a an image
 */
const Gallery = {
    index: {
        handler: async function(request, h) {
            try {
                const allImages = await ImageStore.getAllImages();
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    images: allImages
                });
            } catch (err) {
                console.log(err);
            }
        }
    },

    uploadFile: {
        handler: async function(request, h) {
            try {
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    await ImageStore.uploadImage(request.payload.imagefile);
                    return h.redirect('/gallery');
                }
                return h.view('gallery', {
                    title: 'Cloudinary Gallery',
                    error: 'No file selected'
                });
            } catch (err) {
                console.log(err);
            }
        },
        payload: {
            multipart: true,
            output: 'data',
            maxBytes: 209715200,
            parse: true
        }
    },

    deleteImage: {
        handler: async function(request, h) {
            try {
                await ImageStore.deleteImage(request.params.id);
                return h.redirect('/gallery');
            } catch (err) {
                console.log(err);
            }
        }
    }
};

module.exports = Gallery;