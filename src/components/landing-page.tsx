import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageCircle, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight, 
  Star, 
  Play,
  Video,
  Lock,
  Clock,
  CheckCircle,
  Quote,
  Menu,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import DemoVideoModal from './demo-video-modal';
import DemoVideoModal2 from './demo-video-modal-2';
const DemoVideoModalAny = DemoVideoModal as any;

interface LandingPageProps {
  onEnterChat: () => void;
}

export function LandingPage({ onEnterChat }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDemoVideo, setShowDemoVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            background: `radial-gradient(circle at ${50 + Math.sin(scrollY * 0.01) * 20}% ${50 + Math.cos(scrollY * 0.01) * 20}%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
              >
                <MessageCircle size={20} className="text-white" />
              </motion.div>
              <span className="text-xl">LoopTalk</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Demos', id: 'demos' },
                { name: 'About', id: 'about' },
                { name: 'Features', id: 'features' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -2 }}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost">Login</Button>
              <Button onClick={onEnterChat} className="bg-blue-500 hover:bg-blue-600">
                Get started free
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4">
              {[
                { name: 'Demos', id: 'demos' },
                { name: 'About', id: 'about' },
                { name: 'Features', id: 'features' },
                { name: 'Testimonials', id: 'testimonials' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.id)}
                  className="block text-gray-600 hover:text-blue-600 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2">
                <Button variant="ghost">Login</Button>
                <Button onClick={onEnterChat} className="bg-blue-500 hover:bg-blue-600">
                  Get started free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="demos" className="relative z-10 pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="space-y-8"
            >
              <motion.h1
                {...fadeInUp}
                className="text-4xl lg:text-6xl leading-tight"
              >
                Start chatting with
                <br />
                <span className="text-blue-500">customers</span>, anywhere
                <br />
                anytime with application
              </motion.h1>

              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-lg"
              >
                Chat software that allows you to chat from any
                device at any time without any interruption.
              </motion.p>

              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4"
              >
                <Button 
                  onClick={onEnterChat}
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600 px-8 py-4 text-lg"
                >
                  Start chatting
                </Button>
                {/* <Button 
                  variant="outline" 
                  size="lg" 
                  // className="px-8 py-4"
                  onClick={() => setShowDemoVideo(true)}
                >
                  <Play size={20} className="mr-2" />
                  <DemoVideoModal />
                </Button> */}
                <DemoVideoModal />
              </motion.div>

              {/* Stats */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-8 pt-8"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">2.2M</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold flex items-center">
                    4.8 <Star size={20} className="text-yellow-400 ml-1 fill-current" />
                  </div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <ImageWithFallback
                  src="src/assets/5a625a6e5b08f77c4213cf793b64d5a0cfaecd1c.png"
                  alt="Customer service representative"
                  className="rounded-3xl w-full max-w-lg mx-auto"
                />
                
                {/* Floating Chat Bubbles */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 -left-4 bg-white rounded-2xl p-4 shadow-lg max-w-xs"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">Hi there! I'd like to know more about your product.</p>
                      <span className="text-xs text-gray-500">2 min</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute bottom-8 -right-4 bg-blue-500 text-white rounded-2xl p-4 shadow-lg max-w-xs"
                >
                  <p className="text-sm">Great! I'd be happy to help you with that. What specific features are you interested in?</p>
                  <span className="text-xs text-blue-200">Just now</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Features for a better experience</h2>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Video,
                title: "Video messaging",
                description: "This software is very easy for you to manage you can use it as you wish."
              },
              {
                icon: Lock,
                title: "Keep safe & private",
                description: "This software is very easy for you to manage you can use it as you wish."
              },
              {
                icon: Clock,
                title: "Save you time",
                description: "This software is very easy for you to manage you can use it as you wish."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={32} className="text-blue-500" />
                </div>
                <h3 className="text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Chat Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1603754060338-5a1dbd8377fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwd29tYW4lMjB2aWRlbyUyMGNhbGwlMjBsYXB0b3B8ZW58MXx8fHwxNzU3NDA3OTE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Video call interface"
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          <Video size={16} />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                          🎤
                        </Button>
                      </div>
                      <div className="text-white text-sm">05:23</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl leading-tight">
                Meet your customers,
                <br />
                with live video chatty
              </h2>
              <p className="text-gray-600 text-lg">
                Great software that allows you to chat from any
                place at any time without any interruption.
              </p>
              <p className="text-gray-600">
                Great software that allows you to chat from any
                place at any time without any interruption to
                organize your chat and chat from any place at
                any time without any interruption.
              </p>

              {/* User testimonial */}
              <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1595956936239-4cad0fa009e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGN1c3RvbWVycyUyMHRlc3RpbW9uaWFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU3NDA3OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Sani Makan</p>
                  <p className="text-sm text-gray-600">How can I help you?</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sales Integration Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl leading-tight">
                Start selling directly
                <br />
                inside conversations
              </h2>
              <p className="text-gray-600 text-lg">
                Great software that allows you to chat from any
                place at any time without any interruption.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Start chatting now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Mock chat interface */}
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <p className="text-sm">Hi, do you have this product in stock?</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-3">
                      <p className="text-sm">Yes! Here's the product details:</p>
                    </div>
                  </div>
                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div>
                        <p className="font-medium">Premium Headphones</p>
                        <p className="text-blue-500">$299.99</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3 bg-green-500 hover:bg-green-600">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Mock order interface */}
              <Card className="max-w-md mx-auto">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold">Recent Orders</h3>
                  {[
                    { name: "John Smith", order: "Premium Package", status: "Delivered" },
                    { name: "Sarah Johnson", order: "Basic Plan", status: "Processing" },
                    { name: "Mike Wilson", order: "Pro Features", status: "Delivered" }
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{order.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{order.name}</p>
                          <p className="text-xs text-gray-600">{order.order}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="text-center mt-8">
                <div className="flex items-center justify-center space-x-8">
                  <div>
                    <div className="text-2xl font-bold text-blue-500">4.3K+</div>
                    <div className="text-sm text-gray-600">Website orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-500">7M+</div>
                    <div className="text-sm text-gray-600">Orders in chat</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl leading-tight">
                Get direct orders
                <br />
                from you customers
              </h2>
              <p className="text-gray-600 text-lg">
                Great software that allows you to chat from any
                place at any time without any interruption.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">What our customers are saying</h2>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                quote: "The best toolkit for developers so easy to integrate and publish",
                name: "Mika",
                role: "Website Developer"
              },
              {
                quote: "Figmaboards helps you optimize for engagement, so your whole team can focus on growth",
                name: "Mika",
                role: "Website Developer"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              >
                <Quote className="mb-4 opacity-50" size={32} />
                <p className="text-lg mb-6">{testimonial.quote}</p>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm opacity-75">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl leading-tight">
              Ready to grow your business?
              <br />
              <span className="text-blue-500">Start with application</span>, become faster
              <br />
              every second
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Great software that allows you to chat from any place at any time without any interruption.
            </p>
            <div className="flex items-center flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onEnterChat}
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600 px-12 py-4 text-lg"
              >
                Start chatting now
              </Button>
              <DemoVideoModal2 />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Get in touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat Support</h3>
              <p className="text-gray-600">Get instant help through our chat support available 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Join our community of over 2.2M users sharing experiences</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Support</h3>
              <p className="text-gray-600">Get priority support with our premium plans</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="text-xl">Chat Application</span>
              </div>
              <p className="text-gray-400">
                Great software that allows you to chat from any place at any time.
              </p>
            </div>
            
            {['Demos', 'About', 'Blog'].map((section) => (
              <div key={section}>
                <h4 className="font-semibold mb-4">{section}</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pages</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center">
            <p className="text-gray-400">Copyright 2023 — All right reserved</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Privacy policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms & conditions</a>
            </div>
          </div>
        </div>
      </footer>
      {/* Demo Video Modal */}
      <DemoVideoModalAny 
        isOpen={showDemoVideo} 
        onClose={() => setShowDemoVideo(false)} 
      />
    </div>
  );
}