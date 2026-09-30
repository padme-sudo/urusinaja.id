import { motion } from 'motion/react';
import { WhatsappIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { FAQS, WHATSAPP_NUMBER, BRAND } from '@/data';

interface FAQItem {
  question: string;
  answer: string;
}

interface FrequentlyAskedQuestionsProps {
  title?: string;
  description?: string;
  data?: FAQItem[];
  className?: string;
  supportEmail?: string;
}

const defaultFAQs: FAQItem[] = FAQS.map((f) => ({
  question: f.q,
  answer: f.a,
}));

export default function FrequentlyAskedQuestions({
  title = 'Sering ditanyakan',
  description = 'Semua yang perlu kamu tahu sebelum order. Masih bingung? Langsung chat admin, fast respon — atau email',
  data = defaultFAQs,
  className,
  supportEmail = 'halo@urusinaja.id',
}: FrequentlyAskedQuestionsProps) {
  const words = title.split(' ');
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo ${BRAND}! Saya ada pertanyaan`)}`;

  return (
    <section
      id="faq"
      className={cn('relative w-full overflow-hidden py-14 md:py-24', className)}
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="relative z-10 max-w-4xl text-left text-3xl font-bold tracking-tight text-zinc-900 md:text-5xl dark:text-zinc-100">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: 'easeInOut',
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative z-10 mt-6 max-w-2xl text-left text-base text-zinc-500 dark:text-zinc-400 md:text-lg"
        >
          {description}{' '}
          <a
            href={`mailto:${supportEmail}`}
            className="text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            {supportEmail}
          </a>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 md:mt-14"
        >
          <Accordion type="single" collapsible className="w-full">
            {data.map((item, index) => (
              <motion.div
                key={`faq-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: 0.5 + index * 0.07,
                  ease: 'easeOut',
                }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <div style={{ textAlign: 'left', marginTop: 22 }}>
          <a
            className="btn btn-primary max-sm:w-full"
            target="_blank"
            rel="noreferrer"
            href={wa}
          >
            <WhatsappIcon size={17} /> Tanya Admin
          </a>
        </div>
      </div>
    </section>
  );
}
