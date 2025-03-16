import React, { useState } from 'react'

const voiceOptions = [
    {
        "value": "af_sarah",
        "name": "Sarah (Female)"
    },
    {
        "value": "af_sky",
        "name": "Sky (Female)"
    },
    {
        "value": "am_adam",
        "name": "Adam (Male)"
    },
    {
        "value": "hf_alpha",
        "name": "Alpha (Female)"
    },
    {
        "value": "hf_beta",
        "name": "Beta (Female)"
    },
]

const Voices = ({onHandleFormData}) => {
    const [selectedVoice, setSelectedVoice] = useState("")
  return (
    <div>
        <h2 className='text-sm font-semibold mt-4'>Voices</h2>
        <p className='text-sm mt-2 opacity-50 py-1'>Select one voice</p>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
            {voiceOptions.map((voice, i)=>(
                <div onClick={()=>{
                    setSelectedVoice(voice.name)
                    onHandleFormData("voice", voice.value)
                }} className={`p-3 border hover:border-white ${selectedVoice == voice.name && "border border-white"} rounded-md cursor-pointer bg-secondary`} key={i}>
                    <h2>{voice.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Voices