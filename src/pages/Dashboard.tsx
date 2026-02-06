import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProfileCompleteness } from "@/components/ProfileCompleteness";
import { SchemeCard } from "@/components/SchemeCard";
import { ApplicationTimelineCompact } from "@/components/ApplicationTimeline";
import {
  ArrowRight,
  Bell,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { mockSchemes, mockApplications, mockNotifications } from "@/data/mockData";

const Dashboard = () => {
  const recommendedSchemes = mockSchemes.filter(s => s.aiScore && s.aiScore > 0.7).slice(0, 3);
  const recentApplications = mockApplications.slice(0, 3);
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  const stats = [
    {
      icon: Search,
      label: "Schemes Matched",
      value: "24",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: FileText,
      label: "Applications",
      value: "3",
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      icon: CheckCircle,
      label: "Approved",
      value: "1",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: Clock,
      label: "Pending",
      value: "2",
      color: "text-warning",
      bg: "bg-warning/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" userRole="citizen" />

      <main className="section-container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's an overview of your benefits and applications.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="card-elevated p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/eligibility-check">
                  <Button variant="hero" className="w-full h-auto py-4 flex-col gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-accent-foreground/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <span className="font-semibold">Run Eligibility Check</span>
                    <span className="text-xs text-accent-foreground/70">
                      AI will find matching schemes
                    </span>
                  </Button>
                </Link>
                <Link to="/schemes">
                  <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Search className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-semibold text-foreground">Browse All Schemes</span>
                    <span className="text-xs text-muted-foreground">
                      Explore 500+ government schemes
                    </span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recommended Schemes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Recommended for You
                </h2>
                <Link to="/schemes">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
              </div>
            </div>

            {/* Recent Applications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-5 w-5 text-info" />
                  Your Applications
                </h2>
                <Link to="/applications">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentApplications.map((app) => (
                  <div key={app.id} className="card-elevated p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{app.schemeName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Applied on {new Date(app.submittedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={app.status === 'approved' ? 'approved' : app.status === 'rejected' ? 'rejected' : app.status === 'under_review' ? 'review' : 'pending'}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                        <ApplicationTimelineCompact status={app.status} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <ProfileCompleteness percentage={75} />

            {/* Notifications */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </h3>
                {unreadNotifications.length > 0 && (
                  <Badge variant="info">{unreadNotifications.length} new</Badge>
                )}
              </div>
              <div className="space-y-3">
                {mockNotifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border ${notif.read ? 'bg-background' : 'bg-accent/5 border-accent/20'}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 ${
                        notif.type === 'success' ? 'text-success' :
                        notif.type === 'warning' ? 'text-warning' :
                        notif.type === 'error' ? 'text-destructive' : 'text-info'
                      }`}>
                        {notif.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                         notif.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                         <Bell className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" size="sm">
                View all notifications
              </Button>
            </div>

            {/* Need Help Card */}
            <div className="card-elevated p-6 bg-accent/5 border-accent/20">
              <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to help you with applications and queries.
              </p>
              <Button variant="accent-outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
