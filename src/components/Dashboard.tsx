import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Search, 
  Network, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Play,
  Square,
  Target,
  Eye,
  Zap
} from "lucide-react";

interface ScanResult {
  id: string;
  type: string;
  target: string;
  status: 'running' | 'completed' | 'failed';
  progress: number;
  findings: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const Dashboard = () => {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults] = useState<ScanResult[]>([
    {
      id: "1",
      type: "Port Scan",
      target: "192.168.1.1",
      status: "completed",
      progress: 100,
      findings: 15,
      severity: "medium"
    },
    {
      id: "2", 
      type: "Vulnerability Scan",
      target: "example.com",
      status: "running",
      progress: 73,
      findings: 8,
      severity: "high"
    },
    {
      id: "3",
      type: "DNS Enumeration", 
      target: "target.local",
      status: "completed",
      progress: 100,
      findings: 23,
      severity: "low"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-scan-orange text-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 animate-pulse text-primary" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scan
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-cyber rounded-lg glow-primary">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Recon<span className="text-primary">Whisper</span>
            </h1>
            <p className="text-muted-foreground">Advanced Penetration Testing Suite</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-success text-success">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-glow"></div>
            System Online
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="scans">Active Scans</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Scans</CardTitle>
                <Activity className="h-4 w-4 text-primary animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">3</div>
                <p className="text-xs text-muted-foreground">2 running, 1 queued</p>
              </CardContent>
            </Card>

            <Card className="border-warning/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">46</div>
                <p className="text-xs text-muted-foreground">12 high, 34 medium</p>
              </CardContent>
            </Card>

            <Card className="border-success/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Targets Scanned</CardTitle>
                <Target className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">127</div>
                <p className="text-xs text-muted-foreground">Last 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-cyber-blue/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Open Ports</CardTitle>
                <Network className="h-4 w-4 text-cyber-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyber-blue">892</div>
                <p className="text-xs text-muted-foreground">Across all targets</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Scan */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Quick Scan</span>
              </CardTitle>
              <CardDescription>
                Start a reconnaissance scan on your target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="target">Target IP/Domain</Label>
                  <Input
                    id="target"
                    placeholder="192.168.1.1 or example.com"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="bg-input border-border focus:border-primary"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={handleStartScan}
                    disabled={isScanning || !target}
                    className="bg-gradient-cyber hover:shadow-lg hover:shadow-primary/25"
                  >
                    {isScanning ? (
                      <>
                        <Square className="h-4 w-4 mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Scan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scans" className="space-y-6">
          <div className="grid gap-6">
            {scanResults.map((scan) => (
              <Card key={scan.id} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(scan.status)}
                      <div>
                        <CardTitle className="text-lg">{scan.type}</CardTitle>
                        <CardDescription>{scan.target}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(scan.severity)}>
                        {scan.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {scan.findings} findings
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{scan.progress}%</span>
                    </div>
                    <Progress 
                      value={scan.progress} 
                      className="h-2"
                    />
                  </div>
                  {scan.status === 'running' && (
                    <div className="mt-4 flex items-center space-x-2 text-sm text-primary">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
                      <span>Scanning in progress...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Nmap Scanner", description: "Network discovery and security auditing", icon: Network },
              { name: "Vulnerability Scanner", description: "Automated vulnerability assessment", icon: Search },
              { name: "DNS Enumeration", description: "DNS reconnaissance and subdomain discovery", icon: Eye },
              { name: "Port Scanner", description: "TCP/UDP port scanning and detection", icon: Target },
              { name: "Web Crawler", description: "Web application reconnaissance", icon: Activity },
              { name: "OSINT Gathering", description: "Open source intelligence collection", icon: Shield }
            ].map((tool, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <tool.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scan Results</CardTitle>
              <CardDescription>
                View and analyze your latest reconnaissance findings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results to display yet</p>
                <p className="text-sm">Start a scan to see results here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;