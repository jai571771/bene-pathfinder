import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApplicationTimeline, ApplicationTimelineCompact } from "@/components/ApplicationTimeline";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Download,
  MessageSquare,
} from "lucide-react";
import { mockApplications } from "@/data/mockData";

const Applications = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-destructive" />;
      case 'under_review': return <Clock className="h-5 w-5 text-warning" />;
      default: return <FileText className="h-5 w-5 text-info" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'approved' as const;
      case 'rejected': return 'rejected' as const;
      case 'under_review': return 'review' as const;
      default: return 'pending' as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn userName="John Doe" userRole="citizen" />

      <main className="section-container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My Applications
          </h1>
          <p className="text-muted-foreground">
            Track the status of your scheme applications
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: mockApplications.length, icon: FileText, color: "text-foreground" },
            { label: "Pending", value: mockApplications.filter(a => a.status === 'submitted').length, icon: Clock, color: "text-warning" },
            { label: "Under Review", value: mockApplications.filter(a => a.status === 'under_review').length, icon: Clock, color: "text-info" },
            { label: "Approved", value: mockApplications.filter(a => a.status === 'approved').length, icon: CheckCircle, color: "text-success" },
          ].map((stat) => (
            <div key={stat.label} className="card-elevated p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {mockApplications.map((app) => (
            <div key={app.id} className="card-elevated overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left side - Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(app.status)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getStatusVariant(app.status)}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ID: {app.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {app.schemeName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Applied on {new Date(app.submittedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Progress and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="hidden sm:block">
                      <ApplicationTimelineCompact status={app.status} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <MessageSquare className="h-4 w-4" />
                        Contact
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Timeline (expandable) */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Application Timeline</h4>
                  <ApplicationTimeline timeline={app.timeline} status={app.status} />
                </div>

                {/* Actions based on status */}
                {app.status === 'approved' && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center justify-between bg-success/5 border border-success/20 rounded-lg p-4">
                      <div>
                        <p className="font-medium text-success">Application Approved!</p>
                        <p className="text-sm text-muted-foreground">Download your approval letter and next steps</p>
                      </div>
                      <Button variant="success" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download Letter
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {mockApplications.length === 0 && (
          <div className="card-elevated p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No applications yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Start by checking your eligibility and applying for schemes
            </p>
            <Link to="/eligibility-check">
              <Button>Check Eligibility</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Applications;
