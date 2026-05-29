import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Filter,
  Gauge,
  MessageCircle,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const kpis = [
  {
    label: "Conversas analisadas",
    value: "396",
    delta: "93 com score",
    icon: MessageCircle,
    tone: "bg-zinc-900",
  },
  {
    label: "Score médio geral",
    value: "74,6",
    delta: "Base avaliada",
    icon: Gauge,
    tone: "bg-emerald-700",
  },
  {
    label: "Acurácia técnica",
    value: "40,9%",
    delta: "Relevância = 1",
    icon: BrainCircuit,
    tone: "bg-blue-700",
  },
  {
    label: "Taxa de handoff",
    value: "0%",
    delta: "human_service_session",
    icon: Route,
    tone: "bg-amber-700",
  },
  {
    label: "Sentimento positivo",
    value: "1,5%",
    delta: "5 de 330 classificados",
    icon: Sparkles,
    tone: "bg-purple-700",
  },
  {
    label: "Alucinação",
    value: "1,1%",
    delta: "Fluência = -1",
    icon: AlertTriangle,
    tone: "bg-rose-700",
  },
];

const qualityData = [
  { metric: "Fluência", score: 0.946 },
  { metric: "Relevância", score: 0.387 },
  { metric: "Resolução", score: 0.065 },
  { metric: "Integridade", score: 1 },
];

const topicData = [
  { topic: "Consultar informação", volume: 211, score: 0.755, handoff: 0 },
  { topic: "Consultar plataforma", volume: 123, score: 0.695, handoff: 0 },
  { topic: "Consultar informações", volume: 21, score: 0.868, handoff: 0 },
  { topic: "Solicitar informação", volume: 8, score: 0.762, handoff: 0 },
  { topic: "Solicitar conexão", volume: 3, score: 0, handoff: 0 },
  { topic: "Conexão especialista", volume: 2, score: 0, handoff: 0 },
  { topic: "Consultar preço", volume: 2, score: 0, handoff: 0 },
];

const funnelData = [
  { step: "Entraram no BizAI", value: 396 },
  { step: "Engajaram", value: 330 },
  { step: "Dúvida técnica", value: 93 },
  { step: "Perguntaram preço", value: 2 },
  { step: "Aceitaram handoff", value: 0 },
  { step: "Lead completo", value: 0 },
];

const timelineData = [
  { day: "14/05", conversas: 38, score: 75.8, handoff: 0 },
  { day: "15/05", conversas: 95, score: 79.7, handoff: 0 },
  { day: "16/05", conversas: 70, score: 71.2, handoff: 0 },
  { day: "17/05", conversas: 126, score: 75.6, handoff: 0 },
  { day: "18/05", conversas: 67, score: 71.6, handoff: 0 },
];

const sentimentData = [
  { name: "Positivo", value: 5 },
  { name: "Neutro", value: 322 },
  { name: "Negativo", value: 3 },
];

const gapData = [
  { gap: "Consultar plataforma", freq: 123, severity: "Alta" },
  { gap: "Solicitar conexão", freq: 3, severity: "Média" },
  { gap: "Consultar preço", freq: 2, severity: "Média" },
  { gap: "Solicitar atendimento", freq: 2, severity: "Média" },
  { gap: "Agendar test-drive", freq: 1, severity: "Baixa" },
];

const frictionData = [
  { stage: "CPF/CNPJ", abandono: 0 },
  { stage: "Troca", abandono: 0 },
  { stage: "CEP", abandono: 0 },
  { stage: "Nome", abandono: 0 },
];

const sampleRows = [
  {
    id: "9aa3e6",
    topic: "Consultar informação",
    sentiment: "Neutro",
    score: 85,
    handoff: "Não",
    insight: "Cliente demonstrou interesse em informações sobre o Novo Jeep Renegade; o agente apresentou versões e características.",
  },
  {
    id: "8a4aba",
    topic: "Consultar informação",
    sentiment: "Neutro",
    score: 85,
    handoff: "Não",
    insight: "Cliente pediu informações sobre o Renegade; o agente respondeu com características e versões disponíveis.",
  },
  {
    id: "01b454",
    topic: "Consultar plataforma",
    sentiment: "Neutro",
    score: 68,
    handoff: "Não",
    insight: "Interação classificada como consulta de plataforma, sem resumo analítico preenchido.",
  },
  {
    id: "11e493",
    topic: "Consultar informação",
    sentiment: "Neutro",
    score: 92,
    handoff: "Não",
    insight: "Cliente demonstrou interesse no Jeep Renegade; agente forneceu detalhes e indicou continuidade com especialista.",
  },
];

const tabs = ["Executive", "Qualidade", "Jornada", "Temas", "Gaps"];

function KpiCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Card className="overflow-hidden rounded-2xl border-zinc-200 shadow-sm">
        <CardContent className="p-0">
          <div className="flex items-stretch">
            <div className={`${item.tone} flex w-16 items-center justify-center text-white`}>
              <Icon size={24} />
            </div>
            <div className="flex-1 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{item.label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-3xl font-semibold tracking-tight text-zinc-950">{item.value}</p>
                <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
                  {item.delta}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-zinc-950 p-2 text-white">
          <Icon size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-950">{title}</h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ children, className = "", title, subtitle }) {
  return (
    <Card className={`rounded-2xl border-zinc-200 shadow-sm ${className}`}>
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-zinc-950">{title}</h3>
          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export default function DashboardBizAIJeep() {
  const [activeTab, setActiveTab] = useState("Executive");
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    if (!query) return sampleRows;
    return sampleRows.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const maxFunnel = Math.max(...funnelData.map((d) => d.value));

  return (
    <div className="min-h-screen bg-[#f6f5f1] p-6 text-zinc-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] bg-zinc-950 p-6 text-white shadow-xl"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                <Bot size={16} /> BizAI Concierge Jeep Renegade
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight lg:text-5xl">
                Dashboard de Performance do Agente Consultivo
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">
                Monitoramento da hipótese: elevar a percepção de autoridade da marca por meio de respostas técnicas, consultivas e assertivas sobre o Jeep Renegade.
              </p>
            </div>
            <div className="grid min-w-[280px] grid-cols-2 gap-3 rounded-3xl bg-white/10 p-4">
              <div>
                <p className="text-xs uppercase text-white/50">Período</p>
                <p className="text-lg font-semibold">15–20 mai</p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/50">Filtro</p>
                <p className="text-lg font-semibold">#bizai.control</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3 rounded-3xl bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className="rounded-2xl"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-3 py-2">
            <Search size={16} className="text-zinc-500" />
            <input
              className="bg-transparent text-sm outline-none placeholder:text-zinc-400"
              placeholder="Buscar conversa, tópico ou insight"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {activeTab === "Executive" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {kpis.map((item, index) => (
                <KpiCard key={item.label} item={item} index={index} />
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <ChartCard className="lg:col-span-2" title="Evolução diária" subtitle="Volume, handoff e score médio ao longo do piloto">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="conversas" name="Conversas" fillOpacity={0.2} />
                      <Line type="monotone" dataKey="handoff" name="Handoffs" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Sentimento" subtitle="Percepção do usuário nas interações">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sentimentData} dataKey="value" nameKey="name" outerRadius={105} label>
                        {sentimentData.map((entry, index) => (
                          <Cell key={entry.name} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === "Qualidade" && (
          <div className="space-y-6">
            <SectionTitle icon={ShieldCheck} title="Qualidade Conversacional" subtitle="Fluência, relevância, resolução e integridade do agente" />
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Radar de qualidade" subtitle="Score por dimensão do Conversations">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={qualityData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis domain={[0, 1]} />
                      <Radar name="Score" dataKey="score" fillOpacity={0.35} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Score por dimensão" subtitle="Acompanhamento operacional da assertividade">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={qualityData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 1]} />
                      <YAxis type="category" dataKey="metric" />
                      <Tooltip />
                      <Bar dataKey="score" name="Score" radius={[0, 12, 12, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === "Jornada" && (
          <div className="space-y-6">
            <SectionTitle icon={TrendingUp} title="Jornada e Handoff" subtitle="Funil consultivo, retenção e fricção na qualificação" />
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Funil conversacional" subtitle="Avanço das conversas até lead completo">
                <div className="space-y-3">
                  {funnelData.map((item) => (
                    <div key={item.step}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-zinc-700">{item.step}</span>
                        <span className="text-zinc-500">{item.value}</span>
                      </div>
                      <div className="h-9 rounded-full bg-zinc-100">
                        <div
                          className="flex h-9 items-center justify-end rounded-full bg-zinc-950 px-3 text-xs font-semibold text-white"
                          style={{ width: `${(item.value / maxFunnel) * 100}%` }}
                        >
                          {Math.round((item.value / maxFunnel) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>

              <ChartCard title="Fricção por etapa" subtitle="Onde o usuário tende a abandonar a qualificação">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={frictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="abandono" name="Abandono %" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>
            </div>
          </div>
        )}

        {activeTab === "Temas" && (
          <div className="space-y-6">
            <SectionTitle icon={Filter} title="Cobertura de Temas" subtitle="O que os usuários perguntam e quão bem o agente responde" />
            <ChartCard title="Volume por tópico x Score" subtitle="Prioriza evolução da base de conhecimento">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="volume" name="Volume" radius={[12, 12, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="score" name="Score médio" strokeWidth={3} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        )}

        {activeTab === "Gaps" && (
          <div className="space-y-6">
            <SectionTitle icon={AlertTriangle} title="Gaps e Retroalimentação" subtitle="Sinais para evolução do prompt, base e integrações" />
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard title="Gaps de conhecimento" subtitle="Frequência de lacunas detectadas">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gapData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="gap" width={120} />
                      <Tooltip />
                      <Bar dataKey="freq" name="Frequência" radius={[0, 12, 12, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <Card className="rounded-2xl border-zinc-200 shadow-sm">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-zinc-950">Ações recomendadas</h3>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Ativar envio de imagens oficiais", "Reduz gap de fotos/catálogo e melhora percepção premium."],
                      ["Criar resposta específica para PCD", "Evita resposta genérica e melhora taxa de handoff qualificado."],
                      ["Separar valor de oferta comercial", "Mantém guardrail de preço sem frustrar intenção do usuário."],
                      ["Monitorar links externos", "Evita handoff indevido quando usuário envia URL aleatória."],
                    ].map(([title, desc]) => (
                      <div key={title} className="rounded-2xl bg-zinc-100 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 text-zinc-700" size={18} />
                          <div>
                            <p className="font-medium text-zinc-900">{title}</p>
                            <p className="text-sm text-zinc-500">{desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Card className="rounded-2xl border-zinc-200 shadow-sm">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-zinc-950">Amostra de conversas auditáveis</h3>
                <p className="text-sm text-zinc-500">Base para rastreabilidade, curadoria e melhoria contínua</p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                <Clock3 size={14} /> Atualização diária
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-100 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Tópico</th>
                    <th className="px-4 py-3">Sentimento</th>
                    <th className="px-4 py-3">Score</th>
                    <th className="px-4 py-3">Handoff</th>
                    <th className="px-4 py-3">Insight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 bg-white">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50">
                      <td className="px-4 py-3 font-medium">{row.id}</td>
                      <td className="px-4 py-3">{row.topic}</td>
                      <td className="px-4 py-3">{row.sentiment}</td>
                      <td className="px-4 py-3">{row.score}</td>
                      <td className="px-4 py-3">{row.handoff}</td>
                      <td className="px-4 py-3 text-zinc-500">{row.insight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
