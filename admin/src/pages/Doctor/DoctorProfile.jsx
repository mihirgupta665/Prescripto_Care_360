import React, { useContext, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

	const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
	const { currency, backendUrl } = useContext(AppContext)

	useState(() => {

		if(dToken){
			getProfileData()
		}

	}, [dToken])

	return profileData && (
		<div>
			
		</div>
	)
}

export default DoctorProfile