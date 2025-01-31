import { Cloudinary } from 'cloudinary-core'

export const cl = Cloudinary.new({ cloud_name: 'infokom', secure: true })

export type ImageType = 'avatar' | 'profile' | 'photo'

const cloudinaryHandler = (url: string, type: ImageType = 'avatar') => {
  const urlSplitted = url.split('/')

  let options = {}
  switch (type) {
    case 'avatar':
      options = {
        width: 50,
        height: 50,
        gravity: 'face',
        crop: 'thumb',
        zoom: '0.7',
      }
      break

    case 'profile':
      options = {
        width: 200,
        height: 200,
        gravity: 'face',
        crop: 'thumb',
        zoom: '0.7',
      }
      break

    default:
      options = {
        width: 200,
        height: 200,
        crop: 'thumb',
      }
      break
  }

  return cl.url(
    `${urlSplitted[urlSplitted.length - 2]}/${
      urlSplitted[urlSplitted.length - 1]
    }`,
    options
  )
}

const imagekitHandler = (url: string, type: ImageType = 'avatar') => {
  const baseURL = process.env.NEXT_PUBLIC_IMAGEKIT_URL
  const imageName = url.split('/').pop() // get the image name from the URL

  switch (type) {
    case 'avatar':
      return `${baseURL}/tr:w-50,h-50,fo-face,z-0.5/${imageName}`

    case 'profile':
      return `${baseURL}/tr:w-200,h-200,fo-face,z-0.5/${imageName}`

    default:
      return `${baseURL}/tr:w-200,h-200/${imageName}`
  }
}

export const transformImage = (url: string, type: ImageType = 'avatar') => {
  if (!url) {
    return
  }
  // means url coming from cloudinary
  if (new URL(url).host === 'res.cloudinary.com') {
    return cloudinaryHandler(url, type)
  }

  // means url coming from imagekit
  if (new URL(url).host === 'ik.imagekit.io') {
    return imagekitHandler(url, type)
  }

  return url
}
