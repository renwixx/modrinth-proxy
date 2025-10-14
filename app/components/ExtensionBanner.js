"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

class BannerState {
	constructor() {
		this.dismissed = false
	}
	
	isDismissed() {
		if (typeof window === 'undefined') return false
		return localStorage.getItem('extensionBannerDismissed') === 'true'
	}
	
	dismiss() {
		if (typeof window === 'undefined') return
		localStorage.setItem('extensionBannerDismissed', 'true')
		this.dismissed = true
	}
}

export default function ExtensionBanner() {
	const [visible, setVisible] = useState(false)
	const [bannerState] = useState(() => new BannerState())

	useEffect(() => {
		if (!bannerState.isDismissed()) {
			setTimeout(() => setVisible(true), 1000)
		}
	}, [bannerState])

	const handleDismiss = () => {
		setVisible(false)
		bannerState.dismiss()
	}

	if (!visible) return null

	return (
		<div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:max-w-md animate-slide-up">
			<div className="relative bg-gradient-to-br from-modrinth-green/20 via-green-500/10 to-emerald-500/20 backdrop-blur-xl border border-modrinth-green/30 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden group">
				<div className="absolute inset-0 bg-gradient-to-br from-modrinth-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
				
				<div className="absolute inset-0 opacity-30">
					<div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-modrinth-green/20 to-transparent animate-shimmer"></div>
				</div>

				<button 
					onClick={handleDismiss}
					className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-modrinth-green/50 transition-all duration-300 z-10 group/close"
				>
					<svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover/close:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<div className="relative flex items-start gap-3 sm:gap-4">
					<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-modrinth-green to-green-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
						<svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>

					<div className="flex-1 min-w-0">
						<h3 className="text-base sm:text-lg font-bold text-white mb-1 flex items-center gap-2 flex-wrap">
							<span>Официальное расширение для Chrome</span>
							<span className="px-2 py-0.5 text-xs bg-modrinth-green/20 text-modrinth-green border border-modrinth-green/30 rounded-full">Новое</span>
						</h3>
						<p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-relaxed">
							Скачайте из Google Chrome Web Store и автоматически перенаправляйтесь с Modrinth на наш быстрый интерфейс на русском
						</p>

						<div className="sm:hidden">
							<span className="text-xs text-gray-400 italic">Доступно только с ПК</span>
						</div>

						<a
							href="https://chromewebstore.google.com/detail/modrinth-redirect/poamgpbaabemlgienajmcolicdiapekg"
							target="_blank"
							rel="noopener noreferrer"
							className="hidden sm:inline-flex items-center justify-center gap-2 bg-modrinth-green hover:bg-green-400 text-black px-5 py-3 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-modrinth-green/50"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
							</svg>
							Скачать из Chrome Web Store
						</a>
					</div>
				</div>

				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-modrinth-green via-green-400 to-emerald-500 opacity-50"></div>
			</div>
		</div>
	)
}

