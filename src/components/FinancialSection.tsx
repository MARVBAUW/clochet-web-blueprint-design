import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { FileText, Building, PiggyBank, BarChart3, Shield, Award, AlertTriangle } from "lucide-react";
import DownloadButton from "@/components/navigation/DownloadButton";

const FinancialSection = () => {
  const [activeTab, setActiveTab] = useState("structure");

  // Financial data for visualization
  const investmentData = [
    { name: 'Acquisition', value: 1100000 },
    { name: 'Frais de notaire', value: 88000 },
    { name: 'Travaux', value: 448000 },
    { name: 'Frais annexes', value: 56960 },
  ];

  const financingData = [
    { name: 'Crédit-bail', value: 850000 },
    { name: 'Financement à terme', value: 250000 },
    { name: 'Prêt bancaire', value: 500000 },
    { name: 'Apport personnel', value: 30000 },
    { name: 'Subventions', value: 95000 },
  ];

  const financementInitial = [
    { name: 'Apport personnel', value: 30000 },
    { name: 'Crédit-bail', value: 850000 },
    { name: 'Financement à terme', value: 250000 },
    { name: 'Prêt bancaire', value: 500000 },
    { name: 'Subventions', value: 95000 },
  ];

  // Harmonisation avec MarketSection
  const caMarket = [290660, 346900, 400500];
  const chargesFixes = 54593; // inchangé
  const annuite = 140000;
  const impotsEntretien = 20000;
  const cafData = [
    { an: 'Année 1', caf: caMarket[0] - chargesFixes - annuite - impotsEntretien, rn: caMarket[0] - chargesFixes - annuite - impotsEntretien },
    { an: 'Année 2', caf: caMarket[1] - chargesFixes - annuite - impotsEntretien, rn: caMarket[1] - chargesFixes - annuite - impotsEntretien },
    { an: 'Année 3', caf: caMarket[2] - chargesFixes - annuite - impotsEntretien, rn: caMarket[2] - chargesFixes - annuite - impotsEntretien },
  ];

  // Répartition CA par activité (alignée sur MarketSection)
  const caRepartition = [
    {
      an: 'Année 1',
      hebergement: 195000,
      pensions: 38400,
      equitation: 11760,
      evenementiel: 34000,
      annexes: 11500,
    },
    {
      an: 'Année 2',
      hebergement: 232000,
      pensions: 43200,
      equitation: 14400,
      evenementiel: 42500,
      annexes: 14800,
    },
    {
      an: 'Année 3',
      hebergement: 267000,
      pensions: 48000,
      equitation: 16800,
      evenementiel: 52000,
      annexes: 16700,
    },
  ];

  const COLORS = ['#738c4a', '#596e3b', '#485833', '#3e492f', '#aec185', '#8faa5e', '#dcc294', '#cfa971'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#596e3b" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const formatEuro = (value) => {
    return `${value.toLocaleString()} €`;
  };

  return (
    <section id="financial" className="bg-white py-16 md:py-24">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-olive-800 mb-4">ASPECTS FINANCIERS & JURIDIQUES</h2>
          <p className="text-olive-600 max-w-2xl mx-auto">
            Un modèle économique solide et une structure juridique adaptée pour assurer la pérennité du projet
          </p>
        </div>
        
        <Tabs defaultValue="structure" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="structure" className="flex flex-col items-center gap-1 py-3 px-1">
              <Building size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Structure</span>
            </TabsTrigger>
            <TabsTrigger value="financing" className="flex flex-col items-center gap-1 py-3 px-1">
              <PiggyBank size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Financement</span>
            </TabsTrigger>
            <TabsTrigger value="projections" className="flex flex-col items-center gap-1 py-3 px-1">
              <BarChart3 size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Prévisions</span>
            </TabsTrigger>
            <TabsTrigger value="regulatory" className="flex flex-col items-center gap-1 py-3 px-1">
              <Shield size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Règlementation</span>
            </TabsTrigger>
            <TabsTrigger value="grants" className="flex flex-col items-center gap-1 py-3 px-1">
              <Award size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Aides & Subventions</span>
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex flex-col items-center gap-1 py-3 px-1">
              <AlertTriangle size={18} className="hidden md:block" />
              <span className="text-xs md:text-sm">Risques</span>
            </TabsTrigger>
          </TabsList>

          {/* Section 1: Structure Juridique */}
          <TabsContent value="structure" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Structure juridique du projet</h3>
                
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="text-olive-600" />
                    <h4 className="text-lg font-medium">Montage juridique général</h4>
                  </div>
                  <p className="text-olive-700 mb-4">
                    Une approche multi-structures optimisée avec trois entités juridiques distinctes pour compartimenter les risques et optimiser la fiscalité.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <Card className="border-2 border-olive-200">
                      <CardContent className="p-6">
                        <div className="bg-olive-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                          <span className="text-olive-700 font-semibold">1</span>
                        </div>
                        <h5 className="font-semibold text-olive-800 mb-2">EURL - Structure principale</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Activités:</span>
                            <span>Exploitation des 6 gîtes et espaces événementiels</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Position:</span>
                            <span>Titulaire du crédit-bail immobilier sur l'ensemble de la propriété</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Fiscalité:</span>
                            <span>Option pour l'impôt sur les sociétés (IS)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-olive-200">
                      <CardContent className="p-6">
                        <div className="bg-olive-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                          <span className="text-olive-700 font-semibold">2</span>
                        </div>
                        <h5 className="font-semibold text-olive-800 mb-2">Micro-entreprise - Chambres d'hôtes</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Activités:</span>
                            <span>Exploitation des 3 chambres d'hôtes "chez l'habitant"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Relation:</span>
                            <span>Verse un loyer à l'EURL pour l'occupation du bâtiment annexe</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Fiscalité:</span>
                            <span>Micro-BIC (abattement forfaitaire)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-2 border-olive-200">
                      <CardContent className="p-6">
                        <div className="bg-olive-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                          <span className="text-olive-700 font-semibold">3</span>
                        </div>
                        <h5 className="font-semibold text-olive-800 mb-2">Micro-BA - Activité équestre</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Activités:</span>
                            <span>Exploitation des écuries et activités équestres</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Relation:</span>
                            <span>Bail rural avec l'EURL pour l'usage des installations agricoles</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-olive-600 font-medium">Fiscalité:</span>
                            <span>Micro-bénéfices agricoles (abattement forfaitaire de 87%)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="advantages">
                    <AccordionTrigger className="text-olive-700 hover:text-olive-800">
                      Avantages du montage juridique
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2 text-olive-800">Séparation des risques</h5>
                          <p className="text-sm text-olive-700">Cloisonnement des responsabilités entre les différentes activités, limitant l'exposition globale.</p>
                        </div>
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2 text-olive-800">Optimisation fiscale</h5>
                          <p className="text-sm text-olive-700">Chaque activité bénéficie du régime fiscal le plus avantageux (IS, micro-BIC, micro-BA).</p>
                        </div>
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2 text-olive-800">Maximisation des aides</h5>
                          <p className="text-sm text-olive-700">Accès à des subventions spécifiques pour chaque type d'activité (tourisme, agriculture).</p>
                        </div>
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2 text-olive-800">Clarté administrative</h5>
                          <p className="text-sm text-olive-700">Segmentation claire des obligations comptables, déclaratives et réglementaires.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 2: Plan de Financement */}
          <TabsContent value="financing" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Plan de financement</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4">Investissement initial</h4>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={investmentData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {investmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatEuro(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-cream-50 p-4 rounded-md mt-4">
                      <h5 className="font-medium mb-2">Investissement total: <span className="font-bold">1 692 960 €</span></h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>Acquisition du bien:</span>
                          <span className="font-medium">1 100 000 €</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Frais de notaire:</span>
                          <span className="font-medium">88 000 €</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Travaux de construction/rénovation:</span>
                          <span className="font-medium">448 000 €</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Frais annexes:</span>
                          <span className="font-medium">56 960 €</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4">Sources de financement</h4>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={financingData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {financingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatEuro(value)} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="credit-bail">
                        <AccordionTrigger className="text-olive-700 hover:text-olive-800 text-sm">
                          Détails du crédit-bail immobilier
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-cream-50 p-4 rounded-md">
                            <ul className="text-sm space-y-1">
                              <li className="flex justify-between">
                                <span>Montant financé:</span>
                                <span className="font-medium">1 100 000 €</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Structure:</span>
                                <span className="font-medium">850 000 € crédit-bail + 250 000 € financement à terme</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Durée:</span>
                                <span className="font-medium">15 ans</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Annuité de remboursement:</span>
                                <span className="font-medium">~90 000 €</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Avantage principal:</span>
                                <span className="font-medium">Pas d'apport initial nécessaire</span>
                              </li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="pret-bancaire">
                        <AccordionTrigger className="text-olive-700 hover:text-olive-800 text-sm">
                          Détails du prêt bancaire moyen terme
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-cream-50 p-4 rounded-md">
                            <ul className="text-sm space-y-1">
                              <li className="flex justify-between">
                                <span>Montant financé:</span>
                                <span className="font-medium">500 000 €</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Durée:</span>
                                <span className="font-medium">15 ans</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Taux moyen estimé:</span>
                                <span className="font-medium">3,85%</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Annuité de remboursement:</span>
                                <span className="font-medium">~50 000 €</span>
                              </li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h4 className="text-lg font-medium text-olive-800 mb-4">Évolution de la trésorerie sur 15 ans</h4>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={cafData.map((d, i) => ({ year: `Année ${i + 1}`, value: d.caf }))}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatEuro(value)} />
                        <Area type="monotone" dataKey="value" stroke="#596e3b" fill="#8faa5e" name="Trésorerie" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-cream-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 text-olive-800">Phase de démarrage (2025-2030)</h5>
                      <p className="text-sm text-olive-700">
                        Investissement initial puis montée en puissance progressive. Trésorerie fin 2030: <span className="font-bold">306 739 €</span>
                      </p>
                    </div>
                    <div className="bg-cream-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 text-olive-800">Phase de maturité (2031-2035)</h5>
                      <p className="text-sm text-olive-700">
                        Stabilisation et optimisation de l'activité. Trésorerie fin 2035: <span className="font-bold">745 732 €</span>
                      </p>
                    </div>
                    <div className="bg-cream-50 p-4 rounded-md">
                      <h5 className="font-medium mb-2 text-olive-800">Phase de consolidation (2036-2040)</h5>
                      <p className="text-sm text-olive-700">
                        Fin des emprunts et accélération. Trésorerie fin 2040: <span className="font-bold">1 395 887 €</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 3: Prévisions Financières */}
          <TabsContent value="projections" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Prévisions financières</h3>
                
                <div className="mb-10">
                  {/* Bloc synthétique marché et hypothèses */}
                  <div className="bg-cream-50 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-semibold text-olive-800 mb-4">Projections commerciales et financières</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                      <div>
                        <h5 className="font-medium text-olive-700 mb-2">Segment hébergement touristique</h5>
                        <ul className="text-sm text-olive-700 space-y-1">
                          <li>Marché régional gîtes haut de gamme : <b>185 M€ / an</b></li>
                          <li>Part de marché captable (année 3) : <b>0,16%</b></li>
                          <li>Potentiel annuel : <b>296 000 €</b></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-olive-700 mb-2">Segment activités équestres</h5>
                        <ul className="text-sm text-olive-700 space-y-1">
                          <li>Marché régional tourisme équestre : <b>90 M€ / an</b></li>
                          <li>Part de marché captable (année 3) : <b>0,06%</b></li>
                          <li>Potentiel annuel : <b>54 000 €</b></li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-olive-700 mb-2">Segment événementiel</h5>
                        <ul className="text-sm text-olive-700 space-y-1">
                          <li>Marché réceptions & séminaires ruraux : <b>42 M€ / an</b></li>
                          <li>Part de marché captable (année 3) : <b>0,12%</b></li>
                          <li>Potentiel annuel : <b>50 400 €</b></li>
                        </ul>
                      </div>
                    </div>
                    <div className="overflow-x-auto mb-4">
                      <h5 className="font-medium text-olive-700 mb-2">Évolution prévisionnelle du taux d'occupation</h5>
                      <Table className="text-xs">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Période</TableHead>
                            <TableHead>Année 1</TableHead>
                            <TableHead>Année 2</TableHead>
                            <TableHead>Année 3</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Haute saison (juil-août)</TableCell>
                            <TableCell>65%</TableCell>
                            <TableCell>75%</TableCell>
                            <TableCell>85%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Moyenne saison (avr-juin/sept-oct)</TableCell>
                            <TableCell>45%</TableCell>
                            <TableCell>58%</TableCell>
                            <TableCell>68%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Basse saison (novembre-mars)</TableCell>
                            <TableCell>25%</TableCell>
                            <TableCell>30%</TableCell>
                            <TableCell>38%</TableCell>
                          </TableRow>
                          <TableRow className="bg-cream-100">
                            <TableCell className="font-semibold">Moyenne annuelle</TableCell>
                            <TableCell className="font-semibold">42%</TableCell>
                            <TableCell className="font-semibold">51%</TableCell>
                            <TableCell className="font-semibold">59%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="text-xs text-olive-700">
                      <b>Note :</b> Les hypothèses de taux d’occupation et de potentiel annuel sont strictement cohérentes avec les tableaux de revenus détaillés et les seuils de rentabilité ci-dessous.
                    </div>
                  </div>
                  {/* ...suite existante... */}
                  <h4 className="text-lg font-medium text-olive-800 mb-4">Répartition du chiffre d'affaires</h4>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cafData.map((d, i) => ({ year: `Année ${i + 1}`, value: d.caf }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatEuro(value)} />
                        <Legend />
                        <Bar dataKey="value" name="Chiffre d'affaires" fill="#738c4a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8">
                    <h5 className="font-medium mb-4">Détail des revenus par activité</h5>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Source de revenus</TableHead>
                            <TableHead className="text-right">Année 1</TableHead>
                            <TableHead className="text-right">Année 2</TableHead>
                            <TableHead className="text-right">Année 3</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {['hebergement', 'pensions', 'equitation', 'evenementiel', 'annexes'].map((key, idx) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">
                                {key === 'hebergement' ? 'Hébergements (gîtes et chambres)' :
                                 key === 'pensions' ? 'Pensions équestres' :
                                 key === 'equitation' ? 'Activités équestres' :
                                 key === 'evenementiel' ? 'Événements (mariages, séminaires)' :
                                 'Annexes de services'}
                              </TableCell>
                              <TableCell className="text-right">{formatEuro(caRepartition[0][key])} ({((caRepartition[0][key]/caMarket[0])*100).toFixed(1)}%)</TableCell>
                              <TableCell className="text-right">{formatEuro(caRepartition[1][key])} ({((caRepartition[1][key]/caMarket[1])*100).toFixed(1)}%)</TableCell>
                              <TableCell className="text-right">{formatEuro(caRepartition[2][key])} ({((caRepartition[2][key]/caMarket[2])*100).toFixed(1)}%)</TableCell>
                            </TableRow>
                          ))}
                          <TableRow className="bg-cream-50">
                            <TableCell className="font-bold">TOTAL</TableCell>
                            <TableCell className="text-right font-bold">{formatEuro(caMarket[0])}</TableCell>
                            <TableCell className="text-right font-bold">{formatEuro(caMarket[1])}</TableCell>
                            <TableCell className="text-right font-bold">{formatEuro(caMarket[2])}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                    <div className="text-sm text-olive-600 mt-2">
                      <p>Croissance Année 1 à 2: +5,0% | Croissance Année 2 à 3: +5,0%</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4">Structure des charges</h4>
                    <Card className="border-olive-200">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">Charges variables</h5>
                            <p className="text-sm text-olive-700 mb-2">
                              Environ 25% du chiffre d'affaires
                            </p>
                            <ul className="list-disc list-inside text-sm text-olive-600 space-y-1 pl-2">
                              <li>Consommables hébergement: 10 000 €</li>
                              <li>Charges liées aux activités équestres: 24 092 €</li>
                              <li>Personnel équestre: 30 000 €</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Charges fixes</h5>
                            <p className="text-sm text-olive-700 mb-2">
                              Environ 54 593 € par an
                            </p>
                            <ul className="list-disc list-inside text-sm text-olive-700 space-y-1 pl-2">
                              <li>Taxes foncières: 5 500 €</li>
                              <li>Assurances: 3 500 €</li>
                              <li>Publicité: 8 250 €</li>
                              <li>Autres charges fixes: 37 343 €</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Remboursements d'emprunts</h5>
                            <p className="text-sm text-olive-700">
                              140 000 € par an
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Budget rénovation/entretien</h5>
                            <p className="text-sm text-olive-700">
                              Provision annuelle de 20 000 €
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4">Points d'équilibre et rentabilité</h4>
                    <Card className="border-olive-200">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium mb-2">Seuil de rentabilité (point mort)</h5>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Année 1:</span>
                                  <span className="font-medium">219,5 jours (60% de l'année)</span>
                                </div>
                                <div className="w-full bg-cream-100 rounded-full h-2">
                                  <div className="bg-olive-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Année 2:</span>
                                  <span className="font-medium">193 jours (53% de l'année)</span>
                                </div>
                                <div className="w-full bg-cream-100 rounded-full h-2">
                                  <div className="bg-olive-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Année 3:</span>
                                  <span className="font-medium">175 jours (48% de l'année)</span>
                                </div>
                                <div className="w-full bg-cream-100 rounded-full h-2">
                                  <div className="bg-olive-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Taux d'occupation minimum requis</h5>
                            <ul className="list-disc list-inside text-sm text-olive-600 space-y-1 pl-2">
                              <li>Année 1: 34%</li>
                              <li>Année 2: 32%</li>
                              <li>Année 3: 30%</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Valorisation du projet</h5>
                            <ul className="list-disc list-inside text-sm text-olive-600 space-y-1 pl-2">
                              <li>Retour sur investissement estimé: 10-12 ans</li>
                              <li>Valeur patrimoniale après 15 ans: ~1,8M€</li>
                              <li>Capacité d'autofinancement à terme: 80 000-100 000 € annuels</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <Card className="border-olive-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg text-olive-800 mb-2">4. Rentabilité nette du projet</h4>
                    <p className="text-olive-700 mb-2 text-sm">Mesure si le projet vaut le coup économiquement.</p>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-olive-700 font-bold text-2xl">{((caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960*100).toFixed(1)}%</span>
                      <span className="text-olive-600 text-sm">(Année 3)</span>
                    </div>
                    <BarChart width={220} height={80} data={[{ name: 'Rentabilité', value: (caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960 }]}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip formatter={(v) => (typeof v === 'number' ? (v * 100).toFixed(1) + '%' : '')} content={({ active, payload }) => active && payload && payload.length && typeof payload[0]?.value === 'number' ? (
                        <div className="bg-white p-2 rounded shadow text-xs text-olive-800">
                          <div><b>Rentabilité nette</b> : {(payload[0].value * 100).toFixed(1)}%</div>
                          <div>Résultat net / Total projet</div>
                        </div>
                      ) : null} />
                      <Legend verticalAlign="bottom" height={24} formatter={() => 'Rentabilité nette du projet'} />
                      <Bar dataKey="value" fill="#cfa971" label={{ position: 'top', formatter: (v) => (v * 100).toFixed(1) + '%' }} />
                    </BarChart>
                    <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                      <b>Détail du calcul :</b>
                      <ul className="list-disc list-inside mt-1">
                        <li>Revenus locatifs (CA Année 3) : {formatEuro(caMarket[2])}</li>
                        <li>- Charges : {formatEuro(chargesFixes)}</li>
                        <li>- Annuités : {formatEuro(annuite)}</li>
                        <li>- Impôts/entretien : {formatEuro(impotsEntretien)}</li>
                        <li>Total projet : {formatEuro(1692960)}</li>
                      </ul>
                      <div className="mt-1">Formule appliquée : <span className="font-mono">(Revenus - charges - impôts) / Total projet</span></div>
                      <div className="mt-1">Ici : <span className="font-mono">({formatEuro(caMarket[2])} - {formatEuro(chargesFixes)} - {formatEuro(annuite)} - {formatEuro(impotsEntretien)}) / {formatEuro(1692960)} = {((caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960*100).toFixed(1)}%</span></div>
                      <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">Bon score : 4-5 % = acceptable, 6-8 % = très bien</span></div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section 4: Aspects Réglementaires */}
          <TabsContent value="regulatory" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Aspects réglementaires et légaux</h3>
                
                <Accordion type="single" collapsible className="w-full mb-6">
                  <AccordionItem value="hebergement">
                    <AccordionTrigger className="text-olive-800 hover:text-olive-900 text-base">
                      Réglementation pour l'hébergement touristique
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 py-2">
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Déclaration obligatoire</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>En mairie (formulaire Cerfa n° 13703*07)</li>
                            <li>Distinctions entre meublés de tourisme (gîtes) et chambres d'hôtes</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Classification et normes</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Respect des critères de confort, propreté et équipements</li>
                            <li>Classement officiel "Meublé de Tourisme" envisagé (3 ou 4 étoiles)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Avantages du découpage juridique</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Chaque entité d'hébergement en dessous du seuil des 15 personnes</li>
                            <li>Évitement du classement en Établissement Recevant du Public (ERP)</li>
                            <li>Application des normes des bâtiments d'habitation (moins contraignantes)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Mesures volontaires de sécurité</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Installation d'extincteurs dans chaque gîte</li>
                            <li>Alarmes incendie interconnectées</li>
                            <li>Détecteurs de fumée dans les chambres d'hôtes</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="equestre">
                    <AccordionTrigger className="text-olive-800 hover:text-olive-900 text-base">
                      Réglementation pour l'activité de haras
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 py-2">
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Déclaration et enregistrements</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Déclaration en mairie pour l'ouverture d'un haras</li>
                            <li>Certificat de capacité pour l'accueil et le soin des chevaux</li>
                            <li>Inscription au fichier équin de l'IFCE</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Normes d'hygiène et sécurité</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Standards pour les installations équestres (boxes ≥ 9 m²)</li>
                            <li>Gestion des espaces naturels et du fumier</li>
                            <li>Registre d'élevage et suivi sanitaire obligatoires</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Encadrement des activités</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Diplômes requis pour l'encadrement d'activités équestres (BPJEPS, ATE)</li>
                            <li>Déclaration à la DDCSPP pour l'enseignement/les balades</li>
                            <li>Assurance RC Pro spécifique</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="labels">
                    <AccordionTrigger className="text-olive-800 hover:text-olive-900 text-base">
                      Normes environnementales et labels
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Engagement écologique</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Gestion des eaux usées</li>
                            <li>Traitement des déchets de l'exploitation</li>
                            <li>Utilisation d'énergies renouvelables (panneaux solaires)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Labels visés</h5>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-olive-700 text-xl">🏆</span>
                              </div>
                              <span className="text-xs">Qualité Tourisme</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-olive-700 text-xl">🌿</span>
                              </div>
                              <span className="text-xs">Valeurs Parc naturel régional</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-olive-700 text-xl">🐴</span>
                              </div>
                              <span className="text-xs">Cheval Étape (FFE)</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <div className="w-12 h-12 bg-olive-100 rounded-full flex items-center justify-center mb-2">
                                <span className="text-olive-700 text-xl">🚜</span>
                              </div>
                              <span className="text-xs">Bienvenue à la Ferme</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="assurances">
                    <AccordionTrigger className="text-olive-800 hover:text-olive-900 text-base">
                      Risques juridiques et couverture
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Assurances nécessaires</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Multirisque professionnelle</li>
                            <li>Responsabilité civile professionnelle</li>
                            <li>Dommage-ouvrage (3 200 €)</li>
                            <li>Assurance spécifique activités équestres</li>
                          </ul>
                        </div>
                        
                        <div className="bg-cream-50 p-4 rounded-md">
                          <h5 className="font-medium mb-2">Protection du patrimoine personnel</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Séparation juridique entre patrimoine professionnel et personnel (EURL)</li>
                            <li>Limitation de responsabilité financière (absence de caution personnelle)</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section 5: Aides et subventions */}
          <TabsContent value="grants" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Aides et opportunités de financement</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4 flex items-center gap-2">
                      <Award size={18} className="text-olive-600" />
                      Aides pour l'hébergement touristique
                    </h4>
                    <div className="space-y-4">
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Aides régionales et départementales</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Conseil Régional PACA: Dispositifs pour le tourisme durable</li>
                            <li>Conseil Départemental du Var: Soutien aux hébergements labellisés</li>
                            <li>Subvention pour le tourisme rural: 20 000 €</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Dispositifs nationaux</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Prêt Tourisme de la BPI</li>
                            <li>Garantie ÉGALITÉ Femmes (jusqu'à 80% du prêt bancaire)</li>
                            <li>Prêts à taux zéro (équipements écologiques): 30 000 €</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Financement participatif</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Possibilité de campagne de crowdfunding pour certains équipements innovants</li>
                            <li>Offre de séjours en prévente</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4 flex items-center gap-2">
                      <Award size={18} className="text-olive-600" />
                      Aides pour l'activité équestre
                    </h4>
                    <div className="space-y-4">
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Dotation Jeune Agriculteur (DJA)</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Si moins de 40 ans et diplôme agricole</li>
                            <li>Aides à l'installation (agriculture): 20 000 €</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Aides spécifiques</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Subventions pour le bien-être animal: 10 000 €</li>
                            <li>Aides à l'emploi en milieu rural: 15 000 €</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">PCAE / FEADER</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Financement d'infrastructures équestres (manège, carrière...)</li>
                            <li>Taux d'aide: 20 à 40% des investissements éligibles</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Fonds Éperon</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Pour projets innovants ou structurants de la filière équine</li>
                            <li>Financement potentiel: 20 à 30 000 €, soit 10-15% des infrastructures cheval</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Section 6: Maîtrise des risques */}
          <TabsContent value="risks" className="animate-fade-in opacity-0">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-olive-700 mb-6">Maîtrise des risques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-olive-600" />
                      Diversification et flexibilité
                    </h4>
                    <div className="space-y-4">
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Diversification des sources de revenus</h5>
                          <p className="text-sm text-olive-700 mb-3">
                            Équilibre entre hébergement (70%), activités équestres (15%) et événementiel (15%)
                          </p>
                          <div className="h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Hébergement', value: caRepartition[2].hebergement },
                                    { name: 'Pensions', value: caRepartition[2].pensions },
                                    { name: 'Activités équestres', value: caRepartition[2].equitation },
                                    { name: 'Événementiel', value: caRepartition[2].evenementiel },
                                    { name: 'Annexes', value: caRepartition[2].annexes },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label
                                >
                                  {COLORS.map((color, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={formatEuro} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Flexibilité du modèle</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Possibilité d'adapter l'offre selon la demande</li>
                            <li>Elasticité des tarifs selon les saisons</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Sécurisation du financement</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Crédit-bail immobilier (moins risqué qu'un prêt classique)</li>
                            <li>Échéancier adapté à la montée en puissance du projet</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-olive-800 mb-4 flex items-center gap-2">
                      <AlertTriangle size={18} className="text-olive-600" />
                      Plan de continuité en cas d'aléas
                    </h4>
                    <div className="space-y-4">
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Scénario de sous-performance</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Plan d'économies sur les charges variables</li>
                            <li>Redéploiement de l'offre vers les segments les plus rentables</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Réserve de trésorerie</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Constitution progressive d'une réserve pour imprévus</li>
                            <li>Ligne de crédit de sécurité négociée avec la banque</li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-olive-200">
                        <CardContent className="p-4">
                          <h5 className="font-medium mb-2">Adaptabilité commerciale</h5>
                          <ul className="list-disc list-inside text-sm text-olive-700 space-y-1">
                            <li>Partenariats avec tours opérateurs spécialisés</li>
                            <li>Élargissement de l'offre événementielle hors saison</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Section KPI/SIG - Résultats réels et graphiques */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-olive-800 flex items-center gap-2">
              <BarChart3 size={24} className="text-olive-600" />
              Indicateurs Clés de Performance (KPI/SIG)
            </h3>
            <DownloadButton onDownload={() => {}} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 1. Capacité d’Autofinancement (CAF) */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">1. Capacité d’Autofinancement (CAF)</h4>
                <p className="text-olive-700 mb-2 text-sm">Montre combien l’activité génère de cash chaque année pour rembourser le prêt, investir ou se rémunérer.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">{formatEuro(cafData[0].caf)} / {formatEuro(cafData[1].caf)} / {formatEuro(cafData[2].caf)}</span>
                  <span className="text-olive-600 text-sm">(Années 1/2/3)</span>
                </div>
                <BarChart width={260} height={80} data={cafData.map((d, i) => ({ name: d.an, value: d.caf }))}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip formatter={formatEuro} content={({ active, payload }) => active && payload && payload.length && typeof payload[0]?.value === 'number' ? (
                    <div className="bg-white p-2 rounded shadow text-xs text-olive-800">
                      <div><b>{payload[0]?.payload?.name}</b> : {formatEuro(payload[0]?.value)}</div>
                      <div>Capacité d’autofinancement générée par l’activité</div>
                    </div>
                  ) : null} />
                  <Legend verticalAlign="bottom" height={24} formatter={() => 'CAF (Capacité d’autofinancement)'} />
                  <Bar dataKey="value" fill="#738c4a" label={{ position: 'top', formatter: formatEuro }} />
                </BarChart>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>Résultat net : {formatEuro(cafData[0].rn)} / {formatEuro(cafData[1].rn)} / {formatEuro(cafData[2].rn)}</li>
                    <li>+ Amortissements : {formatEuro(0)} (hypothèse simplifiée)</li>
                    <li>+ Provisions : {formatEuro(0)}</li>
                    <li>- Reprises : {formatEuro(0)}</li>
                    <li>+ Intérêts d’emprunt : {formatEuro(0)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">CAF = Résultat net + amortissements + provisions – reprises + intérêts d’emprunt</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">{formatEuro(cafData[0].rn)} / {formatEuro(cafData[1].rn)} / {formatEuro(cafData[2].rn)}</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">Niveau attendu : supérieur à l’annuité de remboursement du prêt (~140 000 €)</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 2. Taux de couverture des annuités */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">2. Taux de couverture des annuités</h4>
                <p className="text-olive-700 mb-2 text-sm">Indique la capacité à rembourser les emprunts sans difficulté.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">
                    {(cafData[0].caf/annuite).toFixed(2)} / {(cafData[1].caf/annuite).toFixed(2)} / {(cafData[2].caf/annuite).toFixed(2)}
                  </span>
                  <span className="text-olive-600 text-sm">(Années 1/2/3)</span>
                </div>
                <BarChart width={260} height={80} data={cafData.map((d) => ({ name: d.an, value: d.caf/annuite }))}>
                  <XAxis dataKey="name" />
                  <YAxis hide />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? (v * 100).toFixed(1) + '%' : '')} content={({ active, payload }) => active && payload && payload.length && typeof payload[0]?.value === 'number' ? (
                    <div className="bg-white p-2 rounded shadow text-xs text-olive-800">
                      <div><b>Taux de couverture</b> : {(payload[0]?.value * 100).toFixed(1)}%</div>
                      <div>CAF / Annuité de remboursement</div>
                    </div>
                  ) : null} />
                  <Legend verticalAlign="bottom" height={24} formatter={() => 'Taux de couverture des annuités'} />
                  <Bar dataKey="value" fill="#8faa5e" label={{ position: 'top', formatter: (v) => (v * 100).toFixed(1) + '%' }} />
                </BarChart>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>CAF : {formatEuro(cafData[0].caf)} / {formatEuro(cafData[1].caf)} / {formatEuro(cafData[2].caf)}</li>
                    <li>Annuité de remboursement : {formatEuro(annuite)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">Taux = CAF / Annuité</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">{(cafData[0].caf/annuite).toFixed(2)} / {(cafData[1].caf/annuite).toFixed(2)} / {(cafData[2].caf/annuite).toFixed(2)}</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold">Bon score : &gt; 1,2 (idéalement 1,5)</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 3. Apport personnel d’endettement */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">3. Apport personnel d’endettement</h4>
                <p className="text-olive-700 mb-2 text-sm">Un bon apport rassure le banquier et montre l’implication du porteur.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">{((30000/1692960)*100).toFixed(1)}%</span>
                  <span className="text-olive-600 text-sm">(30 000 € / 1 692 960 €)</span>
                </div>
                <PieChart width={120} height={120}>
                  <Pie data={[{ name: 'Apport', value: 30000 }, { name: 'Autres', value: 1662960 }]} dataKey="value" cx="50%" cy="50%" outerRadius={50} fill="#aec185" label />
                  <Cell fill="#738c4a" />
                  <Cell fill="#e5e5e5" />
                </PieChart>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>Apport personnel : {formatEuro(30000)}</li>
                    <li>Montant total du projet : {formatEuro(1692960)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">Apport / Total du projet</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">30 000 € / 1 692 960 € = {((30000/1692960)*100).toFixed(1)}%</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold">Bon score : 10 à 30 %</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 4. Rentabilité nette du projet */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">4. Rentabilité nette du projet</h4>
                <p className="text-olive-700 mb-2 text-sm">Mesure si le projet vaut le coup économiquement.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">{((caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960*100).toFixed(1)}%</span>
                  <span className="text-olive-600 text-sm">(Année 3)</span>
                </div>
                <BarChart width={220} height={80} data={[{ name: 'Rentabilité', value: (caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960 }]}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip formatter={(v) => (typeof v === 'number' ? (v * 100).toFixed(1) + '%' : '')} content={({ active, payload }) => active && payload && payload.length && typeof payload[0]?.value === 'number' ? (
                    <div className="bg-white p-2 rounded shadow text-xs text-olive-800">
                      <div><b>Rentabilité nette</b> : {(payload[0]?.value * 100).toFixed(1)}%</div>
                      <div>Résultat net / Total projet</div>
                    </div>
                  ) : null} />
                  <Legend verticalAlign="bottom" height={24} formatter={() => 'Rentabilité nette du projet'} />
                  <Bar dataKey="value" fill="#cfa971" label={{ position: 'top', formatter: (v) => (v * 100).toFixed(1) + '%' }} />
                </BarChart>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>Revenus locatifs (CA Année 3) : {formatEuro(caMarket[2])}</li>
                    <li>- Charges : {formatEuro(chargesFixes)}</li>
                    <li>- Annuités : {formatEuro(annuite)}</li>
                    <li>- Impôts/entretien : {formatEuro(impotsEntretien)}</li>
                    <li>Total projet : {formatEuro(1692960)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">(Revenus - charges - impôts) / Total projet</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">({formatEuro(caMarket[2])} - {formatEuro(chargesFixes)} - {formatEuro(annuite)} - {formatEuro(impotsEntretien)}) / {formatEuro(1692960)} = {((caMarket[2]-chargesFixes-annuite-impotsEntretien)/1692960*100).toFixed(1)}%</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">Bon score : 4-5 % = acceptable, 6-8 % = très bien</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 5. Trésorerie nette après prêt */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">5. Trésorerie nette après prêt</h4>
                <p className="text-olive-700 mb-2 text-sm">Le matelas de sécurité pour ne pas suffoquer dès la première échéance.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">{formatEuro(cafData[2].caf-annuite)}</span>
                  <span className="text-olive-600 text-sm">(CAF - Annuité)</span>
                </div>
                <BarChart width={220} height={80} data={[{ name: 'Trésorerie nette', value: cafData[2].caf-annuite }]}><XAxis dataKey="name" hide /><YAxis hide /><Tooltip formatter={formatEuro} /><Bar dataKey="value" fill="#596e3b" /></BarChart>
                <p className="text-olive-700 text-sm mt-2"><span className="font-medium">Formule :</span> CAF – Annuité</p>
                <p className="text-olive-700 text-sm"><span className="font-medium">Bon score :</span> Rester en positif chaque mois.</p>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>CAF : {formatEuro(cafData[2].caf)}</li>
                    <li>Annuité de remboursement : {formatEuro(annuite)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">CAF - Annuité</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">{formatEuro(cafData[2].caf)} - {formatEuro(annuite)} = {formatEuro(cafData[2].caf-annuite)}</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-semibold">Bon score : Rester en positif chaque mois</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 6. Fonds de Roulement (FR) */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">6. Fonds de Roulement (FR)</h4>
                <p className="text-olive-700 mb-2 text-sm">Montre si les ressources longues couvrent les besoins longs et alimentent le cycle court terme.</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">{formatEuro(30000+850000+250000+500000+95000-1692960)}</span>
                  <span className="text-olive-600 text-sm">(Capitaux permanents - Actifs immobilisés)</span>
                </div>
                <BarChart width={220} height={80} data={[{ name: 'FR', value: 30000+850000+250000+500000+95000-1692960 }]}><XAxis dataKey="name" hide /><YAxis hide /><Tooltip formatter={formatEuro} /><Bar dataKey="value" fill="#485833" /></BarChart>
                <p className="text-olive-700 text-sm mt-2"><span className="font-medium">Formule :</span> Capitaux permanents – Actifs immobilisés</p>
                <p className="text-olive-700 text-sm"><span className="font-medium">Bon score :</span> Positif</p>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>Capitaux permanents : {formatEuro(30000+850000+250000+500000+95000)}</li>
                    <li>Actifs immobilisés : {formatEuro(1692960)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">FR = Capitaux permanents – Actifs immobilisés</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">(30 000 € + 850 000 € + 250 000 € + 500 000 € + 95 000 €) – 1 692 960 € = {formatEuro(30000+850000+250000+500000+95000-1692960)}</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">Bon score : positif</span></div>
                </div>
              </CardContent>
            </Card>
            {/* 7. Besoin en Fonds de Roulement (BFR) */}
            <Card className="border-olive-200">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg text-olive-800 mb-2">7. Besoin en Fonds de Roulement (BFR)</h4>
                <p className="text-olive-700 mb-2 text-sm">Reflète la trésorerie à mobiliser pour le quotidien (encaissements différés, charges avancées...)</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-olive-700 font-bold text-2xl">0 €</span>
                  <span className="text-olive-600 text-sm">(hypothèse gîte, clients paient à l’avance)</span>
                </div>
                <BarChart width={220} height={80} data={[{ name: 'BFR', value: 0 }]}><XAxis dataKey="name" hide /><YAxis hide /><Tooltip formatter={formatEuro} /><Bar dataKey="value" fill="#aec185" /></BarChart>
                <p className="text-olive-700 text-sm mt-2"><span className="font-medium">Formule :</span> Stocks + Créances clients – Dettes fournisseurs</p>
                <p className="text-olive-700 text-sm"><span className="font-medium">Bon score :</span> Faible ou négatif = excellent</p>
                <div className="mt-2 bg-cream-50 rounded p-3 text-xs text-olive-800">
                  <b>Détail du calcul :</b>
                  <ul className="list-disc list-inside mt-1">
                    <li>Stocks : {formatEuro(0)}</li>
                    <li>Créances clients : {formatEuro(0)}</li>
                    <li>Dettes fournisseurs : {formatEuro(0)}</li>
                  </ul>
                  <div className="mt-1">Formule appliquée : <span className="font-mono">BFR = Stocks + Créances clients – Dettes fournisseurs</span></div>
                  <div className="mt-1">Ici : <span className="font-mono">0 € + 0 € – 0 € = 0 €</span></div>
                  <div className="mt-1"><span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">Bon score : faible ou négatif = excellent</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Tableaux financiers détaillés */}
          <div className="bg-cream-50 rounded-lg p-6 mt-8">
            <h4 className="font-semibold text-lg text-olive-800 mb-4">📊 Plan de trésorerie sur 12 mois</h4>
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead>Mois</TableHead>
                  <TableHead>Entrées (€)</TableHead>
                  <TableHead>Sorties (€)</TableHead>
                  <TableHead>CAF (€)</TableHead>
                  <TableHead>Solde mensuel (€)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 12 }).map((_, i) => {
                  const saison = i < 2 ? 0.05 : i < 5 ? 0.1 : i < 8 ? 0.15 : i < 11 ? 0.1 : 0.05;
                  const entree = Math.round(caMarket[2] * saison);
                  const sortie = Math.round((chargesFixes + annuite + impotsEntretien) / 12);
                  const cafMensuel = Math.round(cafData[2].caf / 12);
                  const solde = entree - sortie + cafMensuel;
                  return (
                    <TableRow key={i}>
                      <TableCell>Mois {i + 1}</TableCell>
                      <TableCell>{formatEuro(entree)}</TableCell>
                      <TableCell>{formatEuro(sortie)}</TableCell>
                      <TableCell>{formatEuro(cafMensuel)}</TableCell>
                      <TableCell className={solde < 0 ? 'text-red-600' : 'text-green-700'}>{formatEuro(solde)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <h4 className="font-semibold text-lg text-olive-800 mb-4">💸 Tableau de financement initial</h4>
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Montant (€)</TableHead>
                  <TableHead>%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financementInitial.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{formatEuro(row.value)}</TableCell>
                    <TableCell>{((row.value / 1692960) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-cream-100 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell>{formatEuro(1692960)}</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <h4 className="font-semibold text-lg text-olive-800 mb-4">📈 Prévisionnel de résultat sur 3 ans</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Année</TableHead>
                  <TableHead>Chiffre d'affaires</TableHead>
                  <TableHead>Charges</TableHead>
                  <TableHead>Annuités</TableHead>
                  <TableHead>Résultat net</TableHead>
                  <TableHead>CAF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { an: 'Année 1', ca: caMarket[0], ch: chargesFixes, ann: annuite, rn: cafData[0].rn, caf: cafData[0].caf },
                  { an: 'Année 2', ca: caMarket[1], ch: chargesFixes, ann: annuite, rn: cafData[1].rn, caf: cafData[1].caf },
                  { an: 'Année 3', ca: caMarket[2], ch: chargesFixes, ann: annuite, rn: cafData[2].rn, caf: cafData[2].caf },
                ].map((row) => (
                  <TableRow key={row.an}>
                    <TableCell>{row.an}</TableCell>
                    <TableCell>{formatEuro(row.ca)}</TableCell>
                    <TableCell>{formatEuro(row.ch)}</TableCell>
                    <TableCell>{formatEuro(row.ann)}</TableCell>
                    <TableCell>{formatEuro(row.rn)}</TableCell>
                    <TableCell>{formatEuro(row.caf)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialSection;
