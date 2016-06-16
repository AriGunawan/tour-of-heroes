class Hero < ActiveRecord::Base
  mount_base64_uploader :picture, PictureUploader
end
