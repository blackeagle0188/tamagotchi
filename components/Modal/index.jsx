/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import NFT from "../NFT"

export default function Modal(props) {
  const [open, setOpen] = useState(false)
  const [nfts, setNFTs] = useState([])

  useEffect(() => {
    let original = props.myopaNFT
    if(original.length == 0) {
        return;
    }
    original = original.filter(item => item["data"]["symbol"] == "MYO")
    setNFTs(original)
    if(original && original.length != 0) {
        setOpen(true)
    }
  }, [props.myopaNFT])

  useEffect(() => {
    if(props.status) {
        setOpen(props.status)
    }
  }, [props.status])

  const handleCloseModal = () => {
    setOpen(false)
    props.setOpenModal(false)
  }
  const handleSelectedNFT = (name) => {
      props.handleCharacterImage(name)
      setOpen(false)
  }

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={true} as={Fragment} hidden={!open}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={handleCloseModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left h-14 flex items-center justify-center">
                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Select 1 NFT
                </Dialog.Title>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-half overflow-y-scroll">
                <div className="sm:flex sm:items-start">
                  <div className="flex flex-wrap justify-around">
                    {
                      nfts.map((nft, i) => (
                          <NFT key={i} uri={nft["data"]["uri"]} handleSelectedNFT={handleSelectedNFT}/>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}