import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-24 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="col-span-1 lg:col-span-2">
                        <h2 className="text-5xl md:text-7xl font-bold font-heading mb-8 tracking-tighter">
                            Let's create <br /> <span className="text-brand-gray">something epic.</span>
                        </h2>
                        <div className="flex flex-col items-start gap-4">
                            <Link
                                href="mailto:shakhwat.rasel989@gmail.com"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
                            >
                                shakhwat.rasel989@gmail.com
                            </Link>
                            <span className="text-brand-gray ml-4">+8801315-183993</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-brand-gray font-medium mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li><Link href="/" className="hover:text-brand-gray transition-colors">Home</Link></li>
                            <li><Link href="#about" className="hover:text-brand-gray transition-colors">About</Link></li>
                            <li><Link href="#work" className="hover:text-brand-gray transition-colors">Work</Link></li>
                            <li><Link href="#contact" className="hover:text-brand-gray transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-brand-gray font-medium mb-6">Socials</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/shakhwat-hossain-rasel-46506628b"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-gray transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Start-with-Rasel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-gray transition-colors"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-brand-gray">
                    <p>© 2026 Shakhwat Hossain Rasel. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>Dhaka & Rangpur, Bangladesh</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
