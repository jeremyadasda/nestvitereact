import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import './Servicio.css';

interface ServicioProps {
  name?: string;
  description?: string;
  servicioId?: number;
}

const Servicio: React.FC<ServicioProps> = ({ name, description, servicioId }) => {
  const [showModal, setShowModal] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showModal) return;

    const handleClickOrTouch = (e: MouseEvent | TouchEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        setShowModal(false);
        setSwipeDirection(null);
        // Reset submission status when modal closes
        setSubmissionStatus('idle');
      }
    };

    document.addEventListener('mousedown', handleClickOrTouch);
    document.addEventListener('touchstart', handleClickOrTouch);

    return () => {
      document.removeEventListener('mousedown', handleClickOrTouch);
      document.removeEventListener('touchstart', handleClickOrTouch);
    };
  }, [showModal]);

  // Swipe handlers for closing the modal with animation
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      setSwipeDirection('left');
      setTimeout(() => {
        setShowModal(false);
        setSubmissionStatus('idle'); // Reset status on swipe close
      }, 100);
    },
    onSwipedRight: () => {
      setSwipeDirection('right');
      setTimeout(() => {
        setShowModal(false);
        setSubmissionStatus('idle'); // Reset status on swipe close
      }, 100);
    },
    trackMouse: true,
  });

  // Animation variants for framer-motion
  const modalVariants = {
    initial: { x: 0, opacity: 1 },
    animate: { x: 0, opacity: 1 },
    exit: (direction: 'left' | 'right' | null) =>
      direction === 'left'
        ? { x: '-100vw', opacity: 0, transition: { duration: 0.15 } }
        : direction === 'right'
        ? { x: '100vw', opacity: 0, transition: { duration: 0.15 } }
        : { opacity: 0, transition: { duration: 0.1 } },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('loading'); // Set status to loading

    try {
      const response = await fetch('/api/servicio-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          servicioId: servicioId, // Pass the current servicio's id
        }),
      });

      if (response.ok) {
        setSubmissionStatus('success'); // Set status to success
        setForm({ name: '', email: '', comment: '' }); // Optionally clear form
      } else {
        setSubmissionStatus('error'); // Set status to error
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      setSubmissionStatus('error'); // Set status to error on network or other issues
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div
        className="greeting-card w-full cursor-pointer select-none"
        onClick={() => {
          setShowModal(true);
          setSwipeDirection(null);
          setSubmissionStatus('idle'); // Reset status when opening modal
        }}
      >
        <h2>DESARROLLO DE {name || 'Soluciones!'} !</h2>
        <p>Registrate para saber mas</p>
      </div>
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            {...swipeHandlers}
          >
            <motion.div
              ref={modalRef}
              className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative text-black"
              custom={swipeDirection}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={() => {
                  setShowModal(false);
                  setSubmissionStatus('idle'); // Reset status on close button click
                }}
                aria-label="Cerrar"
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 select-none">{name}</h3>
              <p className='select-none'>{description}</p>
              {submissionStatus === 'success' ? (
                <div className="text-green-600 mt-4">¡Gracias por tu mensaje! Nos pondremos en contacto pronto.</div>
              ) : submissionStatus === 'error' ? (
                <div className="text-red-600 mt-4">Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.</div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                  <input
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="border rounded p-2"
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Tu email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="border rounded p-2"
                  />
                  <textarea
                    name="comment"
                    placeholder="Comentario"
                    value={form.comment}
                    onChange={handleChange}
                    required
                    className="border rounded p-2"
                  />
                  <button
                    type="submit"
                    className={`bg-blue-600 text-white rounded p-2 mt-2 ${submissionStatus === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={submissionStatus === 'loading'}
                  >
                    {submissionStatus === 'loading' ? 'Enviando...' : 'Enviar'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Servicio;