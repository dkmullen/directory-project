/*jshint esversion: 6 */

// (() => {
  angular.module('directoryApp')

    .factory('widgetFactory2', () => {
      let widget = cloudinary.createUploadWidget({
        upload_preset: 'j5glie9m',
        multiple: false,
        cropping: 'server',
        cropping_aspect_ratio: 1.33,
        theme: 'white',
        stylesheet:
         `#cloudinary-overlay {
           background: rgba(100,0,0,0.7);
         }
         #cloudinary-navbar .source.active {
            border-bottom: 6px solid rgb(249, 109, 22);
          }
          #cloudinary-widget .button, #cloudinary-widget .button.small_button {
            background: rgb(249, 109, 22);
          }
          #cloudinary-widget .button:hover, #cloudinary-widget .button.small_button:hover, #cloudinary-widget .upload_button_holder:hover .button {
            background: rgb(217, 98, 24);
          }`
      },
      function(error, result) {
        if (error) {
          console.log(error);
        } else {
          $scope.myPicture = result[0].secure_url;
        }
      });
      return widget;
  });
// })();
